import { getImageByPath } from "../shared";

module.exports.getWalmartPrice = async (page) => {
  const articlePath = (await page.$x('//*[@id="imagePickerZoomContainer"]/div[2]/div[1]/h4'))[0];
  const priceByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);
  const response = parseFloat(priceByPath.replace('$', '').replace(',', ''));

  return response ? response : 0
};

module.exports.getWalmartName = async (page) => {
  const articlePath = (await page.$x('//*[@id="imagePickerZoomContainer"]/div[1]/h1'))[0];
  const nameByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);

  return nameByPath.trim();
};

module.exports.getWalmartImage = async (page) =>{
  const image  = await getImageByPath('//*[starts-with(@id,"scrollContainer")]/section/div[1]/div[2]/div[1]/div[1]/div/div[2]/div/div/span/div/img', 0, page);
  return image;
};

module.exports.getWalmartMeta = async (page) => {
  const installmentsPath = (await page.$x('//*[starts-with(@id,"imagePickerZoomContainer")]/div[2]/p'))[0]

  let installments = await page.evaluate(el => {
    return el.textContent;
  }, installmentsPath);

  return {
    vendorName: "wallmart",
    vendorRank: 0,
    shippingDetails: '',
    installments: (installments.length > 0) ? installments : "no montly installments"
  }

}

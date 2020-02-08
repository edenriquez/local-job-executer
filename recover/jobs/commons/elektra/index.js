import {
  getImageByPath
} from "../shared";

module.exports.getElektraPrice = async (page) => {
  const priceByPath = (await page.$x('//*[starts-with(@id,"buybox_price")]/span'))[0];
  const price = await page.evaluate(el => {
    return el.textContent;
  }, priceByPath);
  const response = parseFloat(price.replace('$', '').replace(',', ''))
  return response ? response : 0
}
module.exports.getElektraName = async (page) => {
  const nameByPath = (await page.$x('//*[starts-with(@id,"productName_nameProduct")]'))[0]
  const name = await page.evaluate(el => {
    return el.textContent;
  }, nameByPath);
  return name.trim();
}

module.exports.getElektraImage = async (page) => {
  const image = await getImageByPath('//*[starts-with(@id,"image_main_image")]', 0, page);
  return image;
};

module.exports.getElektraMeta = async (page) => {
  // TODO: fix this using skuJson object 
  // const shippingPath = (await page.$x('/html/body/footer/div[1]/div[2]/div[2]/span[1]'))[0];
  // const installmentsPath = (await page.$x('//*[starts-with(@id,"buybox_buy_installments")]'))[0];

  // let shippingDetails = await page.evaluate(el => {
  //   return el.textContent;
  // }, shippingPath);

  // let installments = await page.evaluate(el => {
  //   return el.textContent;
  // }, installmentsPath);

  // installments = installments.replace(/\s+/g, " ").trim();
  // skuJson <----- get installments and other data from here
  return {
    vendorName: "elektra",
    vendorRank: 0,
    shippingDetails: '',
    installments: ''
    // // // installments: (installments.length > 0) ? installments : "no montly installments"
  }
}
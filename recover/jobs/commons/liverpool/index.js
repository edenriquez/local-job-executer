import { getImageByPath } from "../shared";

module.exports.getLiverpoolPrice = async (page) => {
  const prices = (await page.$x("//*[@id='__next']/div[1]/section[1]/div/main/div[4]/div[2]/div/div[2]/p"))[0]
  const textPrice = (await page.evaluate(el => {
    return el.textContent;
  }, prices));
  const response = parseFloat(textPrice.replace('$', '').replace(',', ''))

  return response ? response : 0
}

module.exports.getLiverpoolName = async (page) => {
  const nameByClass = await page.$eval('.a-product__information--title', el => el.textContent);
  const articlePath = (await page.$x("//*[@id='__next']/div[1]/section[1]/div/main/div[4]/h1"))[0]
  const nameByPath = (await page.evaluate(el => {
    return el.textContent;
  }, articlePath));
  if (!nameByClass) {
    return nameByPath.trim();
  }
  return nameByClass.trim();
}

module.exports.getLiverpoolImage = async (page) =>{
  const image  = await getImageByPath('//*[starts-with(@id,"image-real")]', 0, page);
  return image;
};

module.exports.getLiverpoolMeta = async (page) => {
  const installmentsPath = (await page.$x('//*[starts-with(@id,"target")]/div/div/div[2]/div/ul/li[1]/p'))[0]

  let installments = await page.evaluate(el => {
    return el.textContent;
  }, installmentsPath);

  return {
    vendorName: "liverpool",
    vendorRank: 0,
    shippingDetails: '',
    installments: (installments.length > 0) ? installments : "no montly installments"
  }

}

import { getImageByPath } from "../shared";

module.exports.getBestBuyPrice = async (page) => {
  const prices = (await page.$x("//*[starts-with(@id, 'widget-')]/div/div/div[3]"))[0]
  const textPrice = (await page.evaluate(el => {
    return el.textContent;
  }, prices));
  const response = parseFloat(textPrice.replace('$', '').replace(',', ''))
  return response ? response : 0
}
module.exports.getBestBuyName = async (page) => {
  const articlePath = (await page.$x('//*[@id="sku-title"]/h1'))[0];
  const nameByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);
  return nameByPath.trim();
};

module.exports.getBestBuyImage = async (page) =>{
  const image  = await getImageByPath('//*[starts-with(@id,"widget-")]/div/div/div/div[1]/div/div/div/button/img', 0, page);
  return image;
};

module.exports.getBestBuyMeta = async (page) => {
  // TODO: prevent rank without reviews 
  const rankPath = (await page.$x('//*[starts-with(@id,"sku-model")]/ul/li[3]/div/span[2]/span[1]'))[0];
  const shippingPath = (await page.$x('//*[starts-with(@id,"fulfillment-options")]/div/div[1]/div[2]'))[0];
  const installmentsPath = (await page.$x('//*[starts-with(@id,"widget-")]/div/div/div/p'))[1];

  let rank = await page.evaluate(el => {
    return el.textContent;
  }, rankPath);

  let shippingDetails = await page.evaluate(el => {
    return el.textContent;
  }, shippingPath);

  let installments = await page.evaluate(el => {
    return el.textContent;
  }, installmentsPath);

  installments = installments.replace(/\s+/g, " ").trim();
  rank = parseFloat(rank.replace('$', '').replace(',', '')) // TODO: fix this, we dont need replace $

  return {
    vendorName: "bestbuy",
    vendorRank: rank || 0,
    shippingDetails: shippingDetails,
    installments: (installments.length > 0) ? installments : "no montly installments"
  };
};

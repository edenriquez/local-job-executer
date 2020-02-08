import { getImageByPath } from "../shared";
module.exports.getAmazonPrice = async (page) => {
  // TODO: fix this, temporal hack by getting value pointing to second index
  const prices = (await page.$x("//*[starts-with(@id, 'priceblock_')]"))[2]
  const textPrice = (await page.evaluate(el => {
    return el.textContent;
  }, prices));
  const response = parseFloat(textPrice.replace('$', '').replace(',', ''))
  return response ? response : 0
}

module.exports.getAmazonName = async (page) => {
  const nameById = await page.$eval('#productTitle', el => el.textContent);
  const articlePath = (await page.$x('//*[@id="productTitle"]'))[0];
  const nameByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);
  if (!nameById) {
    return nameByPath.trim();
  }
  return nameById.trim();
};

module.exports.getAmazonImage = async (page) => {
  const image = await getImageByPath('//*[starts-with(@id,"landingImage")]', 0, page);
  return image;
};

module.exports.getAmazonMeta = async (page) => {
  const rankPath = (await page.$x('//*[starts-with(@id,"acrPopover")]/span[1]/a/i[1]/span'))[0];
  const shippingPath = (await page.$x('//*[starts-with(@id,"price-shipping-message")]'))[0];
  const installmentsPath = (await page.$x('//*[starts-with(@id,"installmentCalculator")]'))[0];

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
    vendorName: "amazon",
    vendorRank: rank || 0,
    shippingDetails: shippingDetails,
    installments: (installments.length > 0) ? installments : "no montly installments"
  }
}

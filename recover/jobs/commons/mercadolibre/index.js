import { getImageByPath } from "../shared";

module.exports.getMercadoPrice = async (page) => {
  let data = true;
  let productPrice;
  while (data){
    const product = (await page.$x('/html/head/script[10]/text()'))[0];
    let productObj = await page.evaluate(el => {
      return el.textContent;
    }, product);
    try{
      productPrice = JSON.parse(productObj).offers.price;
      data = false;
    }catch(err){
      data = true;
    }
  }
  return productPrice;
}

module.exports.getMercadoName = async (page) => {
  let data = true;
  let productName;
  while (data){
    const product = (await page.$x('/html/head/script[10]/text()'))[0];
    let productObj = await page.evaluate(el => {
      return el.textContent;
    }, product);
    try{
      productName = JSON.parse(productObj).name;
      data = false;
    }catch(err){
      data = true;
    }
  }
  return productName;
}

module.exports.getMercadoImage = async (page) =>{
  let data = true;
  let productImage;
  while (data){
    const product = (await page.$x('/html/head/script[10]/text()'))[0];
    let productObj = await page.evaluate(el => {
      return el.textContent;
    }, product);
    try{
      productImage = JSON.parse(productObj).image;
      data = false;
    }catch(err){
      data = true;
    }
  }
  return productImage;
};
module.exports.getMercadoMeta = async (page) => {
  const dataLayer = await page.evaluate(() => dataLayer[0]);
  /** dataLayer
   * installment_info: "12f"
   * free_shipping: true
   */
  let data = true;
  let rank;

  while (data){
    const product = (await page.$x('/html/head/script[10]/text()'))[0];
    let productObj = await page.evaluate(el => {
      return el.textContent;
    }, product);
    try{
      rank = JSON.parse(productObj).aggregateRating.ratingValue;
      data = false;
    }catch(err){
      data = true;
    }
  }
  let shippingDetails = dataLayer.installment_info;
  let installments = null;
  if (dataLayer.free_shipping){
    installments = 'Envio gratis';
  }
  
  return {
    vendorName: "mercado libre",
    vendorRank: rank || 0,
    shippingDetails: shippingDetails,
    installments: (installments !== null) ? installments : "no montly installments"
  };
};

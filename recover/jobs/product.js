const puppeteer = require('puppeteer');
const axios = require('axios');
const commons = require('./commons/commons');
import {
  PRODUCT_STATUSES,
  CONSTANTS
} from '../config/constants'



const chromeBin = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
const isDev = (process.env.ENV === 'development')
const settings = (isDev) ? {
  headless: false,
  executablePath: chromeBin,
  slowMo: 250,
  devtools: false
} : {}


const vendors = {
  "amazon": new RegExp("amazon"),
  "mercadolibre": new RegExp("mercado"),
  "walmart": new RegExp("walmart"),
  "liverpool": new RegExp("liverpool"),
  "elektra": new RegExp("elektra"),
  "bestbuy": new RegExp("bestbuy")
};

module.exports.scrapProduct = async (url, passedCategory, productId, userId, passedVendor) => {
  return new Promise(async (resolve, reject) => {
    const headlessActive = (process.env.GENERATED_WITH_KUE ? true : false)
    settings.headless = headlessActive
    const browser = await puppeteer.launch(settings)
    try {
      const page = await browser.newPage()
      commons.setDebugViewPort(page, 1280, 800)

      await page.goto(url)

      // get vendor if is not provided
      if (typeof passedVendor === "undefined" || passedVendor.length === 0) {
        passedVendor = Object.keys(vendors).filter((e) => {
          if (vendors[e].test(url)) {
            return e
          }
        })[0]
      }

      // TODO: introduce some noise here

      // get data
      const price = await commons.getPrice(passedVendor, page);
      const name = await commons.getName(passedVendor, page);
      const image = await commons.getImage(passedVendor, page);
      let meta;
      try {
        meta = await commons.getMeta(passedVendor, page);
      } catch (error) {
        meta = {}
      }
      const category = passedCategory
      const status = PRODUCT_STATUSES.UNPUBLISHED

      // meta data
      meta.price = price

      const options = {
        id: productId,
        name: name,
        link: url,
        image: image,
        currentPrice: price,
        status: status,
        meta: meta,
        userId: userId,
        category: category
      };

      await browser.close()
      axios.defaults.baseURL = CONSTANTS.BACKEND_BASE_API
      axios.post('products/new', options)
        .then(async (res) => {
          resolve(res)
        }).catch(async (err) => {
          reject(err)
        })
    } catch (err) {
      await browser.close()
      reject(err)
    }
  })
}
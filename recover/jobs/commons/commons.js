const isDev = (process.env.ENV === 'development')

import {
  VENDOR_NAMES
} from '../../config/constants';

import {
  getAmazonPrice,
  getAmazonName,
  getAmazonImage,
  getAmazonMeta
} from './amazon'
import {
  getMercadoPrice,
  getMercadoName,
  getMercadoImage,
  getMercadoMeta
} from './mercadolibre';

import {
  getWalmartPrice,
  getWalmartName,
  getWalmartImage,
  getWalmartMeta
} from './walmart';

import {
  getLiverpoolPrice,
  getLiverpoolName,
  getLiverpoolImage,
  getLiverpoolMeta
} from './liverpool';

import {
  getElektraPrice,
  getElektraName,
  getElektraImage,
  getElektraMeta
} from './elektra';

import {
  getBestBuyPrice,
  getBestBuyName,
  getBestBuyImage,
  getBestBuyMeta
} from './bestbuy';

module.exports.setDebugViewPort = async (pageContext, width, height) => {
  if (!isDev) {
    return
  }
  await pageContext.setViewport({
    width: width,
    height: height
  })
}

module.exports.getPrice = (vendor, page) => {
  switch (vendor) {
    case VENDOR_NAMES.AMAZON:
      return getAmazonPrice(page)
    case VENDOR_NAMES.MERCADO_LIBRE:
      return getMercadoPrice(page)
    case VENDOR_NAMES.WALMART:
      return getWalmartPrice(page)
    case VENDOR_NAMES.LIVERPOOL:
      return getLiverpoolPrice(page)
    case VENDOR_NAMES.ELEKTRA:
      return getElektraPrice(page)
    case VENDOR_NAMES.BESTBUY:
      return getBestBuyPrice(page)
    default:
      throw new Error('Unknown vendorname: ', vendor);
      break;
  };
};

module.exports.getName = (vendor, page) => {
  switch (vendor) {
    case VENDOR_NAMES.AMAZON:
      return getAmazonName(page)
    case VENDOR_NAMES.MERCADO_LIBRE:
      return getMercadoName(page)
    case VENDOR_NAMES.WALMART:
      return getWalmartName(page)
    case VENDOR_NAMES.LIVERPOOL:
      return getLiverpoolName(page)
    case VENDOR_NAMES.ELEKTRA:
      return getElektraName(page)
    case VENDOR_NAMES.BESTBUY:
      return getBestBuyName(page)
    default:
      throw new Error('Unknown vendorname: ', vendor);
  }
};

module.exports.getImage = (vendor, page) => {
  switch (vendor) {
    case VENDOR_NAMES.AMAZON:
      return getAmazonImage(page);
    case VENDOR_NAMES.MERCADO_LIBRE:
      return getMercadoImage(page)
    case VENDOR_NAMES.WALMART:
      return getWalmartImage(page)
    case VENDOR_NAMES.LIVERPOOL:
      return getLiverpoolImage(page)
    case VENDOR_NAMES.ELEKTRA:
      return getElektraImage(page)
    case VENDOR_NAMES.BESTBUY:
      return getBestBuyImage(page)
    default:
      throw new Error('Unknown vendorname: ', vendor);
  }
}

module.exports.getMeta = (vendor, page) => {
  switch (vendor) {
    case VENDOR_NAMES.AMAZON:
      return getAmazonMeta(page)
    case VENDOR_NAMES.MERCADO_LIBRE:
      return getMercadoMeta(page)
    case VENDOR_NAMES.WALMART:
      return getWalmartMeta(page)
    case VENDOR_NAMES.LIVERPOOL:
      return getLiverpoolMeta(page)
    case VENDOR_NAMES.ELEKTRA:
      return getElektraMeta(page)
    case VENDOR_NAMES.BESTBUY:
      return getBestBuyMeta(page)
    default:
      throw new Error('Unknown vendorname: ', vendor);
  }
};

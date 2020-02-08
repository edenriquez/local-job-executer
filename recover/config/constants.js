module.exports.PRODUCT_STATUSES = {
  CREATED: "created",
  UNPUBLISHED: "unpublished"
}

module.exports.CONSTANTS = {
  BACKEND_BASE_API: "http://localhost:3000",
  RECOVER_BASE_API: "http://localhost:3001"
}
/**
 * Error constant messages {object}
 * ITEM_NOT_FOUND is used for no result given from database
 * UNABLE_SAVE_PRODUCT is used as result when a validation is triggered 
 */

module.exports.ERRORS = {
  CATEGORY_NOT_FOUND: "error category not found",
  ITEM_NOT_FOUND: "error item not found",
  UNABLE_SAVE_PRODUCT: "error item could not be saved",
  COULD_NOT_SAVE_PRODUCT: "there was an error saving the product",
  RESULTS_NOT_FOUND: "could not found any results related"
}

module.exports.VENDOR_NAMES = {
  AMAZON: 'amazon',
  MERCADO_LIBRE: 'mercadolibre',
  WALMART: 'walmart',
  LIVERPOOL: 'liverpool',
  ELEKTRA: 'elektra',
  BESTBUY: 'bestbuy'

}
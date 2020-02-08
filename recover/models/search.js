const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var searchSchema = new mongoose.Schema({
  search_id: {
    type: String,
    index: true,
    unique: true
  },
  product_name: {
    type: String,
    index: true
  },
  product_image: {
    type: String,
  },
  category: {
    type: String,
    index: true
  },
  vendor: {
    type: String,
    index: true
  },
  brand: {
    type: String,
    index: true
  },
  attributes: {
    any: {}
  },
  stats: {
    type: Number,
    required: true
  },
  product_id: {
    type: String,
  }
});

searchSchema.statics.allCoincidences = async function (query, max) {
  const searchRegex = new RegExp(query, 'i');
  return await this.find({
      "$or": [{
          product_name: searchRegex
        },
        {
          category: searchRegex
        },
        {
          vendor: searchRegex
        },
        {
          brand: searchRegex
        },
        // TODO: attributes is pending to include 
      ]
    })
    .limit(max)
    .sort({
      stats: 'desc', // TODO: validate this
    }); // get descending data 
};

searchSchema.statics.findById = async function (id) {
  return await this.findOne({
    search_id: id
  });
};

searchSchema.statics.findByName = async function (name) {
  return await this.findOne({
    product_name: name
  });
};


const Search = mongoose.model('Search', searchSchema);

export default Search;
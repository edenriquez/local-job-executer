import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    index: true
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  currentPrice: {
    type: Number,
  },
  category: { // category should be linked to categories model id
    type: String,
  },
  status: { // published or unpublished, will help to control internally reviews
    type: String,
  }
});

const productProjection = {
  __v: false,
  _id: false
};

productSchema.methods.isValid = (data) => {
  const Joi = require('joi');
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string(),
    image: Joi.string().required(),
    link: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    currentPrice: Joi.number().required(),
    status: Joi.string().valid(
      "published",
      "unpublished"
    ).required(),
    meta: Joi.object()
  });
  return schema.validate(data);
};

productSchema.statics.findById = async function (id) {
  return await this.findOne({
    id: id
  }, productProjection);
};

productSchema.statics.filterProductsByCategory = async function (categoryName) {
  return await this.find({
    category: categoryName
  }, productProjection)
}

productSchema.statics.getProductByCategory = async function (categoryName, id) {
  return await this.find({
    category: categoryName,
    id: id
  }, productProjection)
}

productSchema.statics.deleteById = async function (id) {
  return await this.deleteOne({
    id: id
  });
};

productSchema.statics.getAllProducts = async function () {
  return await this.find({}, productProjection);
};

const Product = mongoose.model('Product', productSchema);

export default Product;
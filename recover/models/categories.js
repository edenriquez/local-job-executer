import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    index: true
  },
  name: {
    type: String,
    unique: true
  },
  status: {
    type: String,
  },
});

categorySchema.methods.isValid = (data) => {
  const Joi = require('joi');
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    status: Joi.string().valid(
      "active",
      "deactive"
    ).required()
  })
  return schema.validate(data)

}

categorySchema.statics.getAllCategories = async function () {
  return await this.find({});
};

categorySchema.statics.findCategory = async function (categoryName) {
  return await this.find({
    name: categoryName
  });
}

categorySchema.statics.findByName = async function (name) {
  return await this.findOne(name);
};

const Category = mongoose.model('Category', categorySchema);

export default Category;
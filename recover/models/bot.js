import mongoose from 'mongoose';

const botSchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    required: true
  },
});


botSchema.methods.isValid = (data) => {
  const Joi = require('joi');
  const schema = Joi.object().keys({
    product_id: Joi.string().required(),
    status: Joi.string().valid(
      "created",
      "pending",
      "reviewed",
      "old"
    ).required()

  });
  return schema.validate(data);
};

const Bot = mongoose.model('Bot', botSchema);

export default Bot;
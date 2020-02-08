const mongoose = require('mongoose');

var vendorSchema = new mongoose.Schema({
  vendor_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

vendorSchema.methods.isValid = (data) => {
  const Joi = require('joi');
  const schema = Joi.object().keys({
    vendor_id: Joi.string().required(),
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

const Vendor = mongoose.model('Vendor', vendorSchema);
export default Vendor;
const mongoose = require("mongoose");
const joi = require("joi");

const ServiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Service = mongoose.model("Service", ServiceSchema);

function validateAddService(obj) {
  const schema = joi.object({
    description: joi.string().trim().required(),
    title: joi.string().trim().required(),
  });
  return schema.validate(obj);
}

function validateUpdateService(obj) {
  const schema = joi.object({
    description: joi.string().trim(),
    title: joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = {
  Service,
  validateAddService,
  validateUpdateService,
};

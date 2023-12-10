const mongoose = require("mongoose")
const joi = require("joi")

const TestimonySchema = new mongoose.Schema(
    {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
          trim: true,
        },
        isAccepted : {
          type : Boolean, default : false
        },
        witnessName: {
          type: String,
          required: true,
        },
        witnessProfilePhoto : { type : String}
      },
      {
        timestamps: true,
      }
)
const Testimony = mongoose.model("Testimony", TestimonySchema);

function validateCreateTestimony(obj) {
    const schema = joi.object({
      text: joi.string().trim().required(),
    });
    return schema.validate(obj);
  }

  function validateUpdateTestimony(obj) {
    const schema = joi.object({
      text: joi.string().trim(),
    });
    return schema.validate(obj);
  }

  module.exports = {
    Testimony,
    validateCreateTestimony,
    validateUpdateTestimony,
  };
  
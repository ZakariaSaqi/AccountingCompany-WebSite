const mongoose = require("mongoose")
const joi = require("joi")

const CommentSchema = new mongoose.Schema(
    {
        blogId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Blog",
          required: true,
        },
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
        commenterName: {
          type: String,
          required: true,
        },
        commenteProfilePhoto : { type : String}
      },
      {
        timestamps: true,
      }
)
const Comment = mongoose.model("Comment", CommentSchema);

function validateCreateComment(obj) {
    const schema = joi.object({
      blogId: joi.string().required(),
      text: joi.string().trim().required(),
    });
    return schema.validate(obj);
  }

  function validateUpdateComment(obj) {
    const schema = joi.object({
      text: joi.string().trim(),
    });
    return schema.validate(obj);
  }

  module.exports = {
    Comment,
    validateCreateComment,
    validateUpdateComment,
  };
  
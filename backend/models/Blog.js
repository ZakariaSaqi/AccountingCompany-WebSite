const mongoose = require("mongoose")
const joi = require("joi")

const BlogSchema = new mongoose.Schema(
    {
        title : {
            type: String, required: true, trim: true,
        },
        description : {
            type: String, required: true,  trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: "User",  required: true,
        },
        image: {  type: Object,
            default: {
              url: "", publicId : null,
            }
        },
        likes: [
              {
            type: mongoose.Schema.Types.ObjectId, ref: "User",
              },
            ]
    }, {
        timestamps : true,  
        toJSON : { virtuals : true},  
        toObject : { virtuals : true}
    }
)
BlogSchema.virtual("comments", {
    ref : "Comment",
    foreignField : "blogId",
    localField : "_id"
  })
const Blog = mongoose.model("Blog", BlogSchema)

function validateCreateBlog(obj){
    const schema = joi.object({
        title : joi.string().trim().required(),
        description : joi.string().trim().required(),
    })
    return schema.validate(obj)
}

function validateUpdateBlog(obj){
    const schema = joi.object({
        title : joi.string().trim(),
        description : joi.string().trim(),
    })
    return schema.validate(obj)
}

module.exports = {
    Blog,
    validateCreateBlog,
    validateUpdateBlog
}
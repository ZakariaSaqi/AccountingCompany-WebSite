const mongoose = require("mongoose")
const joi = require("joi")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const UserSchema = new mongoose.Schema({
    firstname : {
        type : String, required : true, trim : true
    },
    lastname : {
        type : String, required : true, uppercase : true ,  trim : true
    },
    email : {
        type : String, required : true, unique : true, trim : true
    },
    password : {
        type : String, required: true, trim : true
    },
    profilePhoto : {
        type : Object,
        default : {
            url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            publicId : null
        }
    },
    isAdmin : {
        type : Boolean, default : false
    },
    isAccountVerified : {
        type : Boolean, default : false
    }
}, {
    timestamps : true,
    toJSON : { virtuals : true},
    toObject : { virtuals : true}
})
UserSchema.virtual("blogs", {
    ref : "Blog",
    foreignField : "user",
    localField : "_id"
})
UserSchema.methods.generateAuthToken = function (){
    return jwt.sign({id : this._id, isAdmin : this.isAdmin}, process.env.SECRET)
}


const User = mongoose.model("User", UserSchema)

function validateSignupUser(obj){
    const schema = joi.object({
        firstname : joi.string().trim().required(),
        lastname : joi.string().trim().required(),
        email : joi.string().trim().email().required(),
        password : joi.string().trim().required()
    })
    return schema.validate(obj)
}

function validateLoginUser(obj){
    const schema = joi.object({
        email : joi.string().trim().email().required(),
        password : joi.string().trim().required()
    })
    return schema.validate(obj)
}


function validateEamil(obj){
    const schema = joi.object({
        email : joi.string().trim().email().required(),
    })
    return schema.validate(obj)
}

function validateNewPassword(obj){
    const schema = joi.object({
        password : joi.string().trim().required()
    })
    return schema.validate(obj)
}
function validateUpdateUser(obj){
    const schema = joi.object({
        firstname : joi.string().trim(),
        lastname : joi.string().trim(),
        email : joi.string().trim().email(),
        password : joi.string().trim()
    })
    return schema.validate(obj)
}
module.exports = {
    User,
    validateSignupUser,
    validateLoginUser,
    validateNewPassword,
    validateEamil,
    validateUpdateUser
}

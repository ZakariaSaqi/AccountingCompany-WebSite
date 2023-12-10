const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const {User, validateSignupUser, validateLoginUser} = require("../models/User")

module.exports.signUp = asyncHandler( async (req, res) => {
    const {error} = validateSignupUser(req.body)
    if(error) {
        return res.status(400).json({ message : error.message})
    }
    
    let user = await User.findOne({ email : req.body.email })
    if(user) return res.status(400).json({ message : "Email already used !"})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
    user = new User({
        firstname : req.body.firstname.toLowerCase(),
        lastname : req.body.lastname.toUpperCase(),
        email : req.body.email,
        password : hashedPassword
    })
    await user.save()
    // todo - isVerified
    res.status(201).json({ message: "sign up successfully !" });
})

module.exports.logIn = asyncHandler( async (req, res) => {
    const {error} = validateLoginUser(req.body)
    if(error) return res.status(400).json({ message : error.message})
    
    let user = await User.findOne({ email : req.body.email })
    if(!user) return res.status(400).json({ message : "Email not exists !"})

    const isPasswordMatch = await bcrypt.compare( req.body.password, user.password )
    if(!isPasswordMatch) return  res.status(400).json({ message : "Password incorrect !"})
    // todo - isVerified

    const token = user.generateAuthToken();
    await user.save()

    res.status(201).json({
        firstname : user.firstname,
        lastname : user.lastname,
        _id : user._id,
        isAdmin : user.isAdmin,
        profilePhoto : user.profilePhoto,
        token
    })

})
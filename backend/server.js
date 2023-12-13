require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
// npm install helmet express-rate-limit express-hpp
const xss = require("xss-clean")
const helmet = require("helmet")
const hpp = require("hpp")
const ratelimiting = require("express-rate-limit")

const { errorHandler, notFound } = require("./middlewares/error");
const cors = require("cors")
const app = express(); // init app
app.use(express.json()); // middlewares

app.use(helmet()) // security headers
app.use(hpp()) // http param pollution
app.use(xss()) //protect api (cross site scripting)
app.use(ratelimiting({
  windowMs : 10 * 60 * 500, //100 req in 10mun
  max : 1000,
}))

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port` , process.env.PORT);
    console.log("Connected to MongoDB ^_^");

  });
}).catch ((error) => {
    console.log("Connection to MongoDB failed !", error)
});
app.use(cors({
  origin : process.env.CLIENT_DOMAIN
}))

app.use("/api/auth", require("./routes/authRoute"))
app.use("/api/users", require("./routes/userRoute"))
app.use("/api/blogs", require("./routes/blogRoute"))
app.use("/api/comments", require("./routes/commentRoute"))
app.use("/api/services", require("./routes/serviceRoute"))
app.use("/api/testimonies", require("./routes/testimonyRoute"))
app.use("/api/sendEmail", require("./routes/emailRoute"))
app.use("/api/password", require("./routes/passwordRoute"))

app.use(notFound)
app.use(errorHandler)
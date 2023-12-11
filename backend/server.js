require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const cors = require("cors")
const app = express(); // init app
app.use(express.json()); // middlewares


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
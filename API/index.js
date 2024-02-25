const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors");

dotenv.config();

mongoose.connect
("mongodb+srv://riyasharma:passwordofmongodb@cluster0.tialfuv.mongodb.net/shop?retryWrites=true&w=majority")
.then(()=>{console.log("DB Connection successful")})
.catch((err)=>{console.log(err)});


app.use(express.json())
app.use(cors())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(5000, ()=>{
    console.log("Backend server is running")
});
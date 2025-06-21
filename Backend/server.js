const express = require("express")
const port = 4000
const mongoose = require("mongoose")
const userRouter = require("./routes/userRoute")
const productRouter = require("./routes/productRoute")
const cors = require("cors")

mongoose.connect("mongodb://localhost:27017/wednesday");

const app = express()

app.use (cors())
app.use(express.json())


app.use("/user",userRouter)
app.use("/product",productRouter)



app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
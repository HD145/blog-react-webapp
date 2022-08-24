const express=require ("express");
const mongoose=require("mongoose");
const cors=require('cors');

const app = express()
// mongoose.connect("mongodb://localhost:27017/BlogUser",{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
//     console.log("connection successful")
// }).catch((err)=>console.log(err))


mongoose.connect("mongodb+srv://admin:R6CZYdOztkTQH022@cluster0.nesbhxo.mongodb.net/Blog?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("connection successfulll")
}).catch((err)=>console.log(err))

// R6CZYdOztkTQH022
// app.use(cors)
app.use(express.json())

app.use(require('./routers/router'))

app.get("/",(req,res)=>{
    console.log("hello");
})

app.listen(5000,()=>{
    console.log("Server is running at port 5000")  
})
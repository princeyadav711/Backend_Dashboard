const mongoose = require('mongoose')

const db = mongoose.connect("mongodb+srv://root:root@cluster0.3e0zw.mongodb.net/comics?retryWrites=true&w=majority&appName=Cluster0",{
    useNewUrlParser: true,
    useUnifiedTopology: true
 }).then(()=>{
    console.log("Connected to MongoDB")
 }).catch((err)=>{
    console.log(err)
 })

 module.exports = db


 
const mongoose =require('mongoose')
const vacancy = require('./vacancymodel')

const appliedSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
   
    phone:{
        type:Number,
        required:true
    },
    vacancyID:{
        type: mongoose.Schema.ObjectId,
        required:true
    },
    applieddate:{
        type:String,
        required:true
    }
})
const applied=mongoose.model('applied',appliedSchema)
module.exports=applied
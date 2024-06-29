const mongoose =require('mongoose')

const serviceSchema=new mongoose.Schema({
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
    message:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
})
const service=mongoose.model('service',serviceSchema)
module.exports=service
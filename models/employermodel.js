var mongoose=require('mongoose')
var employerSchema=new mongoose.Schema({
    companyname:{
        type:String,
        required:true
    },
    companytype:{
        type:String,
        required:true
    },
    password:{
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
    address:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
})

var employer=new mongoose.model('employer',employerSchema)
module.exports=employer


var mongoose=require('mongoose')
var vacancyschema=new mongoose.Schema({
    
    jobtitle:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    timing:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    agelimit:{
        type:Number,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    postdate:{
        type:String,
        required:true
    }

})

var vacancy= new mongoose.model('vacancy',vacancyschema)
module.exports=vacancy
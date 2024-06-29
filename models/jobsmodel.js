var mongoose=require('mongoose')
var jobsSchema=new mongoose.Schema({
    employerid:{
        type: mongoose.Schema.ObjectId,
        required:true
    },
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

var jobs= new mongoose.model('jobs',jobsSchema)
module.exports=jobs
var mongoose=require('mongoose')
var candidateschema=new mongoose.Schema({
    candidatename:{
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
    qualification:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
})

var candidate=new mongoose.model('candidate',candidateschema)
module.exports=candidate


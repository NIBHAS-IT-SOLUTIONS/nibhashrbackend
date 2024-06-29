var mongoose = require('mongoose')
var applicationschema= new mongoose.Schema({
    candidateID:{
        type: mongoose.Schema.ObjectId,
        required:true
    },
    jobID:{
        type: mongoose.Schema.ObjectId,
        required:true
    },
    employerID:{
        type: mongoose.Schema.ObjectId,
        required:true
    }
})

var application=mongoose.model('application',applicationschema)
module.exports=application
var express=require('express');
const nibhas = require('../models/servicemodel');
const employer = require('../models/employermodel');
const jobs = require('../models/jobsmodel');

const { default: mongoose } = require('mongoose');
const candidate = require('../models/candidatemodel');
var router=express.Router()
const cdate=new Date()


module.exports={

    postjob:    async (req,res)=>{
                        //console.log(cdate.toLocaleDateString());
                        const {employerid,jobtitle,department,timing,gender,location,salary,experience,agelimit,qualification,skills,description}=req.body.jobdata
                        const employer= new mongoose.Types.ObjectId(employerid)
                        const jobdata=new jobs({
                            employerid:employer,
                            jobtitle:jobtitle, 
                            department:department,
                            timing:timing,
                            gender:gender, 
                            location:location,
                            salary:parseInt(salary),
                            experience:parseInt(experience), 
                            agelimit:parseInt(agelimit),
                            qualification:qualification,
                            skills:skills,
                            description:description,
                        postdate:cdate.toLocaleDateString()
                        })
                        //console.log(jobdata);
                        const addedjobs=await jobdata.save()
                        res.json({message:'success',data:addedjobs})
    },

    deletejob   : async(req,res)=>{
                        const deletejobs=req.query.id
                        //console.log(deletejobs);
                        const deletedjob=await jobs.findByIdAndDelete(deletejobs)
                        res.json({message:'deleted'})
    },

    getjobs :   async(req,res)=>{
                        const employerid=req.query.id
                       // console.log(employerid);
                        if(employerid){
                        //console.log("hi");
                        const employer= new mongoose.Types.ObjectId(employerid)
                        //console.log(employer);
                            const jobsbyemployer=await jobs.find({employerid:employer})
                        res.json({jobsbyemployer:jobsbyemployer})
                        }else{
                        const alljobs=await jobs.aggregate([{
                                
                            $lookup:{ 
                                    from:"employers",
                                    localField:"employerid",
                                    foreignField:"_id",
                                    as:"employerdata"
                                }}, 
                                { 
                                    $unwind: '$employerdata'
                                }, 
                                {
                                    $addFields: {
                                      "employerid":"$employerdata._id",
                                    "employerName": "$employerdata.companyname",
                                    }
                                },
                                
                                {
                                    $project: {
                                        jobtitle:1,
                                        employerid:1,
                                        employerName:1,
                                        department:1,
                                        timing:1,
                                        gender:1,
                                        location:1,
                                        salary:1,
                                        experience:1,
                                        agelimit:1,
                                        qualification:1,
                                        skills:1,
                                        description:1,
                                        postdate:1
                                    }
                            }])
                    
                            res.json({alljobs:alljobs})  
                        }
                        
    },
    getjobsbyDate:async(req,res)=>{
                        const pdate=req.query.pdate
                       // console.log(pdate);
                        const alljobs=await jobs.aggregate([
                                {$match:{
                                    "postdate":pdate
                    
                                }},
                                {
                            $lookup:{ 
                                    from:"employers",
                                    localField:"employerid",
                                    foreignField:"_id",
                                    as:"employerdata"
                                }}, 
                                
                                { 
                                    $unwind: '$employerdata'
                                }, 
                                {
                                    $addFields: {
                                    "employerName": "$employerdata.companyname",
                                    }
                                },
                                
                                {
                                    $project: {
                                        jobtitle:1,
                                        employerName:1,
                                        department:1,
                                        timing:1,
                                        gender:1,
                                        location:1,
                                        salary:1,
                                        experience:1,
                                        agelimit:1,
                                        qualification:1,
                                        skills:1,
                                        description:1,
                                        postdate:1
                                    }
                            }])
                        res.json({alljobs})
    },
    getjobsBylocation:async(req,res)=>{
                            const location=req.query.location
                            
                            const alljobs=await jobs.aggregate([
                                    {$match:{
                                        "location":location
                        
                                    }},
                                    {
                                $lookup:{ 
                                        from:"employers",
                                        localField:"employerid",
                                        foreignField:"_id",
                                        as:"employerdata"
                                    }}, 
                                    
                                    { 
                                        $unwind: '$employerdata'
                                    }, 
                                    {
                                        $addFields: {
                                        "employerName": "$employerdata.companyname",
                                        }
                                    },
                                    
                                    {
                                        $project: {
                                            jobtitle:1,
                                            employerName:1,
                                            department:1,
                                            timing:1,
                                            gender:1,
                                            location:1,
                                            salary:1,
                                            experience:1,
                                            agelimit:1,
                                            qualification:1,
                                            skills:1,
                                            description:1,
                                            postdate:1
                                        }
                                }])

                            res.json({alljobs})
    },

    getjobsbyqual:  async(req,res)=>{
        const qualification=req.query.qualification
        //console.log(pdate);
        const alljobs=await jobs.aggregate([
                {
                    $match:{
                    "qualification":qualification
                    
                   }},
                   {
            $lookup:{ 
                    from:"employers",
                    localField:"employerid",
                    foreignField:"_id",
                    as:"employerdata"
                }}, 
                
                { 
                    $unwind: '$employerdata'
                   }, 
                   {
                    $addFields: {
                     "employerName": "$employerdata.companyname",
                    }
                   },
                   
                {
                    $project: {
                        jobtitle:1,
                        employerName:1,
                        department:1,
                        timing:1,
                        gender:1,
                        location:1,
                        salary:1,
                        experience:1,
                        agelimit:1,
                        qualification:1,
                        skills:1,
                        description:1,
                        postdate:1
                    }
            }])
        res.json({alljobs}) 
    },
    getlocations:async(req,res)=>{

        const locations=await jobs.aggregate([
            {
              $group: {
                _id: null,
                locations: {
                  $addToSet: "$location"
                }
              }
            },
            {
              $project: {
                _id: 0,
                locations: 1
              }
            }
          ])
          //console.log(locations);
          res.json({locations})
    },
    getqualifications:async (req,res)=>{

        var qualifications=await jobs.aggregate(
            [
                {
                  $project: {
                    qualification: {
                      $split: ["$qualification", ","]
                    }
                  }
                },
                {
                  $unwind: "$qualification"
                },
                {
                  $group: {
                    _id: null,
                    qualifications: {
                      $addToSet: "$qualification"
                    }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    qualifications: 1
                  }
                }
              ]
        )
        res.json(qualifications)
    }
}
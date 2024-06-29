
const nibhas = require('../models/servicemodel');
const employer = require('../models/employermodel');
const jobs = require('../models/jobsmodel');

const { default: mongoose, Mongoose } = require('mongoose');
const candidate = require('../models/candidatemodel');
const application = require('../models/applicationmodel');


const cdate=new Date()

module.exports={
    applyjobs:  async(req,res)=>{

      //  console.log(req.body.jobs);
        const {candidateid,jobid,employerid}=req.body.jobs

        apply=new application({
            candidateID:new mongoose.Types.ObjectId(candidateid),
            jobID:new mongoose.Types.ObjectId(jobid),
            employerID:new mongoose.Types.ObjectId(employerid)
        })

        try{

            applieddata=await apply.save()
            res.json({message:'success',data:applieddata})
        }
        catch(err){
            console.log(err);
        }
        
    },
    appliedjobs:async(req,res)=>{

        const jobsapplied=await application.aggregate(
            [
                {
                  $lookup: {
                    from: "jobs",
                    localField: "jobID",
                    foreignField: "_id",
                    as: "job",
                  },
                },
                {
                  $lookup: {
                    from: "candidates",
                    localField: "candidateID",
                    foreignField: "_id",
                    as: "candidate",
                  },
                },
                {
                  $lookup: {
                    from: "employers",
                    localField: "employerID",
                    foreignField: "_id",
                    as: "employer",
                  },
                }, 
              
                {
                  $unwind: "$job",
                },
                {
                  $addFields: {
                    "jobtitle":"$job.jobtitle"
                   
              }},
                {
                  $unwind: "$candidate",
                },
                {
                  $unwind: "$employer",
                },

                {
                  $project: {
                    jobID: 1,
                    candidateID: 1,
                    employerID:1,
                    job: "$job",
                    candidate: "$candidate",
                    employer:"$employer"
                    
                  },
                },
              ]
        )
        res.json(jobsapplied)

    }
}
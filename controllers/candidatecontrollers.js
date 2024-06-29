
const nibhas = require('../models/servicemodel');
const employer = require('../models/employermodel');
const jobs = require('../models/jobsmodel');

const { default: mongoose, Mongoose } = require('mongoose');
const candidate = require('../models/candidatemodel');
const application = require('../models/applicationmodel');


const cdate=new Date()


module.exports={

    candidateregister:  async(req,res)=>{
                            //console.log(req.body.data);
                            const {candidatename,email,password,phone,qualification,skills}=req.body.data
                            const candidatedata=new candidate({
                                candidatename:candidatename,
                                email:email,
                                password:password,
                                phone:parseInt(phone),
                                qualification:qualification,
                                skills:skills
                            })
                            try{
                                const addeddata=await candidatedata.save()
                                res.json({message:'success',data:addeddata})
                            }
                            catch(err){
                            console.log(err);
                            }
    },
    candidatelogin:async(req,res)=>{     
                            //console.log(req.body.data);
                            const {email,password} =req.body.data;
                            const user=await candidate.findOne({email}) 
                                if(user){
                                if(password === user.password){
                                    console.log(user); 
                                    //req.session.userdata=user
                                    //req.session.userloggedIn=true
                                    res.send({message:"login sucess",user:user, success: true})
                                }else{
                                    res.send({message:"wrong credentials", success: false})
                                }
                                    
                                }else{  
                                
                                    res.send({message:"not registered", success: false})
                                }
                            
    },
    getcandidatebyId:   async(req,res)=>{

                            id=req.params.id
                            //console.log(id);
                            loggeddata=await candidate.findById(id)
                            res.json({user:loggeddata})  
    },
    
}
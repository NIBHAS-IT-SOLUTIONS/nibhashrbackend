
const nibhas = require('../models/servicemodel');
const employer = require('../models/employermodel');
const jobs = require('../models/jobsmodel');

const { default: mongoose } = require('mongoose');
const candidate = require('../models/candidatemodel');

const cdate=new Date()


module.exports={

    register: async(req,res)=>{
                
                const {companyname,companytype,password,email,phone,address,url}=req.body.data
                const employerdata=new employer({
                    companyname:companyname,
                    companytype:companytype,
                    password:password,
                    email:email,
                    phone:parseInt(phone),
                    address:address,
                    url:url
                })
                try{
                    const addeddata=await employerdata.save()
                    .then(res.json())
                }
                catch(err){
                console.log(err);
                }
    },

    login:  async(req,res)=>{
                
                const {email,password} =req.body.data;
                const user=await employer.findOne({email})
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

    getemployerById:async(req,res)=>{

                id=req.params.id
                loggeddata=await employer.findById(id)
                
                res.send({user:loggeddata})  
     },

     getemployers:  async(req,res)=>{

        const allemployers=await employer.find()
        res.json({allemployers})
    },
    



}
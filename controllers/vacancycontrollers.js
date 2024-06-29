var express = require('express');
const vacancy = require('../models/vacancymodel');
const applied = require('../models/appliedmodel');
const cdate = new Date()
const { default: mongoose } = require('mongoose');

module.exports = {

    addvacancy: async (req, res) => {

        const { jobtitle, department, timing, gender, location, salary, experience, agelimit, qualification, skills, description } = req.body.jobdata


        const vacancydata = new vacancy({

            jobtitle: jobtitle,
            department: department,
            timing: timing,
            gender: gender,
            location: location,
            salary: parseInt(salary),
            experience: parseInt(experience),
            agelimit: parseInt(agelimit),
            qualification: qualification,
            skills: skills,
            description: description,
            postdate: cdate.toLocaleDateString()
        })

        try {
            const addedjobs = await vacancydata.save()
            res.json({ message: 'success', data: addedjobs })
        }
        catch (err) {
            console.log(err);
        }


    },
    getvacancy: async (req, res) => {

        try {
            var vacancies = await vacancy.find()
           // console.log(vacancies);
            res.json({
                vacancies
            })
        }
        catch (err) {
            console.log(err);
            res.json(err)
        }
    }
    ,
    getvacancybyId: async (req, res) => {

        let id = req.params.id

        try {
            const editvaca = await vacancy.findById(id)

            res.status(200).json({ editvaca })
        }
        catch (err) {
            res.status(400).json({ message: err.message })
        }
    },
    deleteVacancy: async (req, res) => {
        let id = req.params.id
        try {
            const deletedvacancy = await vacancy.findByIdAndDelete(id)
            res.status(200).json({ deletedvacancy })
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },


    updatevacancy: async (req, res) => {
        let id = req.params.id

        const { jobtitle, department, timing, gender, location, salary, experience, agelimit, qualification, skills, description } = req.body.data


        const vacancydata = {

            jobtitle: jobtitle,
            department: department,
            timing: timing,
            gender: gender,
            location: location,
            salary: parseInt(salary),
            experience: parseInt(experience),
            agelimit: parseInt(agelimit),
            qualification: qualification,
            skills: skills,
            description: description,
            postdate: cdate.toLocaleDateString()
        }

        try {
            let updatedvacancy = await vacancy.findByIdAndUpdate(id, vacancydata)
           //console.log(updatedvacancy);
            res.status(200).json({ updatedvacancy })
        }
        catch (err) {
            res.status(400).json({ message: err.message })
        }
    },
    applyvacancy: async (req, res) => {

        const { vacancyid, from_name, frommail, phone } = req.body.data;
        const applieddata = new applied({
            vacancyID: new mongoose.Types.ObjectId(vacancyid),
            name: from_name,
            email: frommail,
            phone: parseInt(phone),
            applieddate: cdate.toLocaleDateString()
        });
        try {
            const addeddata = await applieddata.save();
            res.json(addeddata);
        } catch (err) {
            console.log(err);
        }
    },
    appliedvacancies: async (req, res) => {

        const jobsapplied = await applied.aggregate(
            [
                {
                    $lookup: {
                        from: "files",
                        localField: "_id",
                        foreignField: "appliedID",
                        as: "file_info",
                    },
                },
                {
                    $lookup: {
                        from: "vacancies",
                        localField: "vacancyID",
                        foreignField: "_id",
                        as: "vacancies",
                    },
                }, {
                    $unwind: "$vacancies",
                },
                {
                    $unwind: "$file_info",
                },
                {
                    $project: {
                        name: 1,
                        email: 1,
                        phone: 1,
                        applieddate: 1,
                        filename: "$file_info.filename",
                        path: "$file_info.path",
                        jobtitle: "$vacancies.jobtitle",
                        department: "$vacancies.department",
                        Location: "$vacancies.location",
                    },
                },
            ]

        )
        res.json(jobsapplied)

    },
    searchbyjob:async(req,res)=>{
       // console.log(req.body.searchjob);
        let searchjob=req.body.searchjob
       // 
        try{
            const jobbyjobtitle=await vacancy.find(
                        {
                            'jobtitle': {
                            '$regex': searchjob, 
                            '$options': 'i'
                            }
                        }
                    )
                    console.log(jobbyjobtitle);
                    res.json(jobbyjobtitle)
        }catch(err){
            console.log(err);
        }
    },
    filterjobs:async(req,res)=>{
       // console.log(req.body);
        const {searchjob,location,experience,firstsal,secsal}=req.body.searchfilter
        try{
            const filteredjobs=await vacancy.find(
                {
                    salary: { $gte: firstsal, $lte: secsal },
                    location: location,
                    experience: experience,
                    jobtitle: { $regex: searchjob ,'$options': 'i'}
                  }
                 
            )
           // console.log(filteredjobs);
            res.json(filteredjobs)
        }catch(err){
            console.log(err);
        }
    }
}
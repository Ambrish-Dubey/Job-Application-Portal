import jobsModel from '../models/jobsModel.js'
import mongoose from 'mongoose'

export const jobsController = async (req,res,next)=>
    {
        const {company,position} = req.body

        if(!company || !position){next('Provide all fields')}

        req.body.createdBy = req.user.userId

        const job = await jobsModel.create( req.body )
        res.status(201).json( {job} )
    }

export const getAllJobsController = async (req,res,next)=>
    {

        const {status} = req.query

        const existingStatus = ['interview','pending','reject']

        let jobs

        if(!status){  jobs = await jobsModel.find( {createdBy:req.user.userId} )}
        
        if(existingStatus.includes(status)){ jobs = await jobsModel.find( {status} )}
        else{return res.status(404).json( {message:'Wrong status query'} )}

        res.status(201).json( {success:true,jobs_are:jobs.length,jobs} )
    }

export const updateJobController = async (req,res,next)=>
    {
        const {id} = req.params
        const {company,position} = req.body

        if(!company || !position){next('Please provide all fields')}

        const job = await jobsModel.findOne( {_id:id} )

        if(!job){next('No jobs found with this id')}

        if(!req.user.userId === job.createdBy.toString())
            {
                next('You are not authorized to update this job')
                return
            }

        const updateJob = await jobsModel.findOneAndUpdate( {_id:id} , req.body , {new:true,runValidators:true})

        res.status(200).json( {updateJob} )
    }

export const deleteJobController = async (req,res,next)=>
    {
        const {id} = req.params

        const job = await jobsModel.findOne( {_id:id} )

        if(!job){next('No job found with id')}

        //if(!req.user.userID === id){next('You are not authorized to delete this job');return}

        await job.deleteOne()

        res.status(201).json( {message:'Job deleted'} )
    }

export const jobStatsController = async (req,res)=>
    {
        //Basic structure of aggregate function:- model.aggregate([ {key:{key:value}}, {key:{key:value}} ])
        
        const stats = await jobsModel.aggregate(
            [ 
            {
                $match:
                {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId)
                }
            },
            {
                $group:
                {
                    _id: '$position', //from the model fields we can select any enums
                    count:{$sum:1}
                }
            }, 
            ])

            if (stats.length === 0 ){stats.push('Nothing yet')}

            res.status(201).json( stats )
    }
import userModel from '../models/userModel.js'


export const updateController = async (req,res,next)=>
    {
        //If Authorization is OKAY we could access certain properties:- 
        //1. req.user => {userId:98658522,iat:98656,exp:866665} (example)
        
        //Data from frontend and authentication:- 
        const {name,email,location,lastName} = req.body
        if(!name || !email || !location || !lastName ){next('Fill the data')}


        //req.user.userId is a key and value is the unique id of the user.
        const user = await userModel.findOne( {_id:req.user.userId} )

        //User can update all the previous fields in the database:-
        user.name = name
        user.email = email
        user.location = location
        user.lastName = lastName

        //Saving
        await user.save()

        //Creating a token because its almost like we just registered a new user
        const token = user.createJWT()

        res.status(200).json( {success:true,message:'Updated',user,token} )

    }
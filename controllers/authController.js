import userModel from '../models/userModel.js'


export const registerController = async (req,res,next)=>
    {
        try {
            //Initial checking up if are we even getting data from frontend or not?
            const {name,email,password} = req.body
            console.log(req.body)
            console.log(`${name},${email},${password}`)

            const expectedKeys = ['name', 'email', 'password'];
            const receivedKeys = Object.keys(req.body);
            const extraKeys = receivedKeys.filter(key => !expectedKeys.includes(key));

            if (extraKeys.length > 0) 
                {
                return res.status(400).send({message: `Unexpected fields: ${extraKeys.join(', ')}`, success: false});
                }

            if (!name){return next('Name isnt filled')}
            if (!email){return next('Email isnt filled')}
            if (!password){return next('Password isnt filled and should contain more than 6 characters')}
                    
            //return res.status(400).send( {message:'Fill the data',success:false} )
                
            //Going into the database with reference to any of the above properties and using 
            //queries on the refernce to find if that certain refrence already exists or not?

            const existingUser = await userModel.findOne( {email} )  //reference is name, query is findOne
            //findOne checks if atleast 1 reference exists or not?

            //if yeah then error case, if no then okay

            if (existingUser)
                {
                    //return res.status(400).send( {message:'User already exists', success:false } )
                    next('User already exists')
                }
            else
                {
                    //create() will create new model inside the table on the basis of references.
                    //Note:- create() also checks for the extra validations for the references in the model
                    //If validation ==> clear, it will create a new model but if not, then model validation error
                    
                    const user = await userModel.create( {name,email,password} )
                    /*While its creating the new user, it checks in the userModel table validations as well.
                    if validation is clear, it will create but if not then catch block will be called automatically.*/

                    const token = user.createJWT()

                    //we can overwrite user as:- user:{"name": "Ambrish1","email": "ambrish11@gmail.com",} to hide password...
                    return res.status(201).send( {message:'User is being created', success:true,user,token} ) //user model will be displayed if its in the send()
                    
                    console.log('Successfully creted')
                }

        } catch (error) {
            next(error)
        }
    }

export const loginController = async (req,res,next)=>
    {
        console.log('req.body:-',req.body)
        console.log('req.body:-',req.user)
        //console.log('req.body:-',req.user.userId)
        //console.log('req.body:-',req.body)

        const {email,password} = req.body

        if (!email || !password){next('Invalid')}

        const user = await userModel.findOne({email})

        console.log(user)

        if(!user){next('Invalid username or password')}

        const isMatch = user.comparePassword(password)

        if(!isMatch){next('Invalid username or password')}

        user.password = undefined

        const token =  user.createJWT()

        res.status(200).json( {success:true,message:'Login successfull!',user,token} )
    }


//we use async to connect with mongodb database which is at different server.


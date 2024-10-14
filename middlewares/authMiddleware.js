import JWT from 'jsonwebtoken'


export const userAuth = async (req,res,next)=>
    {
        const authHeader = req.headers.authorization //jwt is stored in the header section

        if(!authHeader){next('Token not found, please log in')}

        //if it exists, now comparision of the header section token with the server side token (signature as server doesnt saves any tokens and signatures are provided when the token is created.)

        //authHeader will look something like this string:- Bearer RFWGUJNSTGKSN56548969JHRFAGHTGBEN
        const token = authHeader.split(' ')[1] 

        //Comparision from server side( database + seecret key stored in env variables) signature with token from client side:- 

        //try catch as there might be some errors as wer'e fetching data from the database server side.
        //If they dont match, server throws errors hence we use catch.

        try {

            //comparision with token from client with token combined with secret key,header,payload
            const payload = JWT.verify(token, process.env.JWT_SECRET)

            //if matched:-

            //We already have user from the databse if we reach here as we got token from client side i.e we have the user from the databse. 

            //Eg:- Assume we have the following if we got token from the client side:-

            // const token =  user.createJWT() //here token is created 
            // res.status(200).json( {success:true,message:'Login successfull!',user,token} ) //we get token + user object from the databse

            //The below will be available to all the controllers if they have this middleware assigned to them. 
            
            console.log('req.body in:-',req.body)

            console.log('req.user:-',req.user) //Means wer'e accessing 'user' property of the 'req' object but it doesnt exist. This wont give any errors but will set it to 'undefined'
            
            console.log('payload:-',payload) //has all details like userId,iat,exp

            //Changing the user object
            req.user = {userId:payload.userId} //assigning an object which has users unique id from payload object

            console.log('req.user:-',req.user) //The object

            console.log('req.body out:-',req.body)

            next()

        } catch (error) { //if tokens dont match, server throws errors.
            next('Auth failed')
        }

    }
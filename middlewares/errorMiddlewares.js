export const errorMiddleware = (error,req,res,next)=>
    {
        console.log('Middleware')
        res
        .status(400)
        .send( {success:false,message:'Middleware:-Something went wrong.',error} )
    }
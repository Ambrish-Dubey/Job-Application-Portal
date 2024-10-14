import mongoose from "mongoose";
import colors from 'colors'

const connectDB = async (req,res)=>
    {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URL) 
            console.log(`Database and Server is connected. HOST:- ${mongoose.connection.host}`.bgMagenta.red)
        } catch (error) {
            console.log('Error').bgRed.white
        }
    }

export default connectDB
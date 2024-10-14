import express from "express";
import dotenv from 'dotenv';
import colors from 'colors';

import cors from 'cors'
import morgan from 'morgan'

//files

import testRoutes from './routes/testRoutes.js'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import jobsRoutes from './routes/jobsRoutes.js'

//middlewares
import {errorMiddleware} from './middlewares/errorMiddlewares.js'

const app = express()

//Process env variables:-
dotenv.config()

const port = process.env.PORT || 8000

//Connection with mongodb
connectDB();

//To deal with json data from client we use:- app.use(express.json())
app.use(express.json())

//cors and morgan
app.use(cors())
app.use(morgan("dev"))      //method of the url, url,speed, etc

app.use('/api/v1/test', testRoutes )        //protected route
app.use('/api/v1/auth', authRoutes )        //login and creation
app.use('/api/v1/user', userRoutes )        //update user
app.use('/api/v1/job',  jobsRoutes )        //all about jobs

app.use(errorMiddleware) //app level middleware

app.listen(port, ()=>
    {
        console.log(`Server running at:- http://localhost:${port}`.bgCyan.white)
    } )
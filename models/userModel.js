import mongoose from "mongoose";
import validator from 'validator'

import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema( 
    {
        name:
        {
            type:String,
            required:[true,'Name error message']
        },
        lastName:
        {
            type:String,
        },
        email:
        {
            type:String,
            required:[true,'Email not given error message'],
            unique:true,                                        //requires validator package
            validate:validator.isEmail                          //requires validator package
        },
        password:
        {
            type:String,
            required:[true,'password required error message'],
            minlength:[6,'password length should be more than 6 characters']
        },
        location:
        {
            type:String,
            default:"India",
            
        },
    }, {timestamps:true}  )

//Hashing middleware just before saving the new user into the databse
userSchema.pre("save", async function () {
    if(!this.isModified) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt )
})

//Token
userSchema.methods.createJWT = function()
{
    return JWT.sign( {userId:this._id},process.env.JWT_SECRET,{expiresIn:'1d'} )
}

//login compare password after getting email
userSchema.methods.comparePassword = async function(userPassword)
{
    const isMatch = await bcrypt.compare(userPassword, this.password )
    return isMatch
}

export default mongoose.model( "User", userSchema )         //User is the table name in the database.

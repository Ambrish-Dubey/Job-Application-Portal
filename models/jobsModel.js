import mongoose from 'mongoose'


const jobSchema = new mongoose.Schema( 
    {
        company:
        {
            type:String,
            required:[true, 'Fill the company name, it is required']
        },
        position:
        {
            type:String,
            required:[true, 'Job position is required']
        },
        status:
        {
            type:String,
            enum:['interview','pending','reject'], //if enum is used, we have to pass default.
            default:'pending'
        },
        workType:
        {
            type:String,
            enum:['full-time','part-time','contract'],
            default:'full-time'
        },
        workLocation:
        {
            type:String,
            required:[true, 'workLocation is required'],
            default:'Mumbai'
        },
        createdBy:
        {
            type:mongoose.Types.ObjectId,
            ref:"User"      //connected collection name
        },
    },{timestamps:true} )

export default mongoose.model('Job', jobSchema ) //database collection name should be:- jobs
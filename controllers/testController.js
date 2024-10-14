export const testController = (req,res)=>      //function called at post method
    {
        //req.body is an object which has all the data from post method
        console.log(req.body)

        const {name} = req.body //Post method sends the frontend data for eg :- forms
        console.log(name)

        //res.status(any code).send('Data in string will be displayed on the browser window')

        res.status(200).send(`Your name is:- ${name}`)

    }


const express = require('express');
const app = express();
const port = 3000;
const zod = require('zod');
app.use(express.json());

const schema = zod.array(zod.number());

app.post('/',(req,res)=>{
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);

    if(!response.success){
        res.status(411).json({
            msg:'Invalid Input'
        })
    }else{
        res.status(200).send({
            response
        });
    }
});
app.use((err,req,res,next)=>{
    res.status(500).send('Internal Server Error');       //global catch  error handling middleware
})
app.listen(port);
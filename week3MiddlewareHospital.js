const express = require('express');
const app = express();
const port = 3000;
let noOfRequest = 0;

function userMiddleware(req,res,next){
   const username = req.headers.username;
   const password = req.headers.password;
   if(username !="gourav" || password !="pass"){
        res.status(403).json({
           msg:"User Not Found"
       });
    }else{
        next();
   }
};
function kidneyMiddleware(req,res,next){
   const kidneyId = req.query.kidneyId;
   if(kidneyId!=1 && kidneyId!=2){
    res.status(411).json({
        msg:"Incorrect input"
    });
   }else{
    next();
   }
};

function numberOfRequests(req,res,next){
    noOfRequest++;
    next();  
};

let start_time = -1;
function timeStart(req,res,next){
    start_time = Date.now();
    next();
};

let timeTaken = -1;
function timeEnd(req,res,next){
    let end_time = Date.now();
    timeTaken = end_time - start_time;
    return
    // res.status(200).json({
    //     TimeTaken:`${timeTaken} seconds`
    // })                                            //use this res for logging time 
}

app.use(timeStart);
app.use(numberOfRequests);
app.use(userMiddleware);  // calling user middleware everywhere 

app.get('/health-check',kidneyMiddleware,(req,res,next)=>{
    res.status(200).json({
        msg:"you have a healthy Body",
    });
    next();
},timeEnd)

app.get('/kidney-check',kidneyMiddleware,(req,res,next)=>{
    res.status(200).json({
        msg:"you have a healthy Kidney",
    });
    next();
},timeEnd)

app.get('/heart-check',(req,res,next)=>{
    res.status(200).json({
        msg:"you have a healthy Heart",
    });
    next();
},timeEnd)

app.listen(port);



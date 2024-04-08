const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
   {
      username:"gourav@gmail.com",
      password:"123",
      name:"gourav joshi",
   },
   {
      username:"billi@gmail.com",
      password:"123451",
      name:"billi joshi",
   },
   {
      username:"hololo@gmail.com",
      password:"1243",
      name:"hololo",
   },
];

function userExists(username,password){
    let userexist = false
    ALL_USERS.forEach((user)=>{
        if(user.username==username && user.password==password){
            userexist = true;
        }
    })
    return userexist;
    
    // let userexist = false;
    // let user = ALL_USERS.find((user)=>{
    //     if(user.username===username && user.password===password) userexist = true;
    // });
    // return userexist;
}

app.post('/signin',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    if(!userExists(username,password)){
        return res.status(403).json({                   //user doesnt exist so return error 
            msg:"user doesnt exists in database",
        });
    }
    //user exists so return token 
    const token = jwt.sign({username:username},jwtPassword);
    return res.status(200).json({
        token
    });
});

app.get("/users",(req,res)=>{
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token,jwtPassword);
        const username = decoded.username;
        res.status(200).json({
           users: ALL_USERS.filter((value)=>{
            if(value.username == username){
                return false;
            }else{
                return true;
            }
           })
        });
    } catch (err) {
        res.status(403).json({
            msg:"Invalid token"
        });
    }
});

app.listen(3000);
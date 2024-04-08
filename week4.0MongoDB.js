// connection string mongodb+srv://admin:qwertyuiop12345@cluster0.tnbbbql.mongodb.net/  for mongo
// NOW THIS CONNECTION STRING IS USELESS AS THE DATABASE IS REMOVED 
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://admin:qwertyuiop12345@cluster0.tnbbbql.mongodb.net/users_app');
const User = mongoose.model('Users',{  
    name:String,
    email:String,
    password:String
});

app.post('/signup',async function (req,res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    const existingUser = await User.findOne({ email:email });
    if(existingUser){
       return res.status(400).send("Username already exists");
    }

    // const user = new User({
    //     name: name,
    //     email: email,
    //     password:password
    // });
    // user.save();
    // or directly use 
    await User.create({
        name: name,
        email: email,
        password:password
    })

    res.json({
        msg: "user created successfully"
    });
});

app.listen(3000);

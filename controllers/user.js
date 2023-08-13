const User= require('../models/user');

const bcrypt= require('bcrypt');

exports.postSignUp = async (req,res,next) => {

    try{
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;

        if(!name ||!email||!password){
            return res.status(400).json({error: "Fields are not filled"});
        }
        const saltrounds=10;
        bcrypt.hash(password, saltrounds,async (err, hash) => {
        console.log(err);
        await User.create({name:name, email:email, password:hash});
        res.status(201).json({message:"User Successfully Created"});

        })    
    } catch(err){
        res.status(500).json({error:"User Already Exist"});
    
    }
}





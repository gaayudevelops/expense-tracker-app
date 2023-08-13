const User= require('../models/user');


exports.postSignUp = async (req,res,next) => {

    try{
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;

        if(!name ||!email||!password){
            return res.status(400).json({error: "Fields are not filled"});
        }

        const data = await User.create({name:name, email:email, password:password});
        res.status(201).json({message:"User Successfully Created"});

    } catch(err){
        res.status(500).json({error:"User Already Exist"});
    
    }
}





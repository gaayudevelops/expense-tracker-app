const User= require('../models/user');


exports.postLogin = async (req,res,next) => {

    try{
        const email=req.body.email;
        const password=req.body.password;

        if(!email||!password){
            return res.status(400).json({error: "Fields are not filled"});
        }

        const user = await User.findAll({where:{email:email}});

        if(user.length===0){ //if no such user exists in the db
            return res.status(404).json({error: "User not found"});
        }
        const userobj= user[0];
        const userpassword =userobj.dataValues.password;
        if(password!= userpassword){ //if user exist but password is wrong
            return res.status(401).json({error: "User not authorized"});
        }
        else{ 
            return res.status(200).json({message: "User login sucessful"});
        }

    } catch(err){
        res.status(500).json({error:err});
    
    }
}



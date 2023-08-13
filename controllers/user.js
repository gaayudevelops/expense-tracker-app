const User= require('../models/user');

const bcrypt = require('bcrypt');

exports.postLogin = async (req,res,next) => {

    try{
        const email=req.body.email;
        const password=req.body.password;

        if(!email||!password){
            return res.status(400).json({error: "Fields are not filled"});
        }

        const user = await User.findAll({where:{email:email}});

        if(user.length > 0){ //if the user array is not empty, email exists in db.
            bcrypt.compare(password, user[0].password, (err,result) => {
                if(err){ //error from bcrypt.compare
                    throw new Error('Something is wrong');
                }
                if(result === true){ //if bcrypt.compare is success with correct password  
                    res.status(200).json({success: true, message:"User logged in Successfully"});
                }
                else{ //if bcrypt.compare is success with incorrect password  
                    return res.status(400).json({success: false, message:"Password is incorrect"})
                }
            })
        }else{ //if user array is empty, email does not exists in db.
            return res.status(404).json({success: false, message:"User does not exist"})
        }       
    }catch(err){
        res.status(500).json({error:err});
    }

}



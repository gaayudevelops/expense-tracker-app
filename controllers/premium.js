const User= require('../models/user');


const getUserLeaderboard = async (req,res) => { 
 try{
    const leaderboardofusers = await User.findAll({
      
        order:[['totalExpense', 'ASC']]

    })
    res.status(200).json(leaderboardofusers);
}catch (err){
    console.log(err);
    res.status(500).json(err);
 }
}

module.exports = {
    getUserLeaderboard
}

const User= require('../models/user');

const Expense= require('../models/expense');

const sequelize = require('../util/database');

const getUserLeaderboard = async (req,res) => { 
 try{
    const users = await User.findAll();
    const expenses = await Expense.findAll();
    const UserAggregatedExpense = {};
    expenses.forEach((expense) =>{

        if(UserAggregatedExpense[expense.userId]){
            UserAggregatedExpense[expense.userId] = UserAggregatedExpense[expense.userId] + expense.amount;
        }else{
            UserAggregatedExpense[expense.userId] = expense.amount;
        }
    })

    var userLeaderBoardDetails = [];
    users.forEach((user) => {
        
        if(!UserAggregatedExpense[user.id]){
            userLeaderBoardDetails.push({
                name:user.name,
                total_cost: 0
            })
        }else{
            userLeaderBoardDetails.push({
                name:user.name,
                total_cost: UserAggregatedExpense[user.id]
            })
        }
        
    }) 

    console.log(userLeaderBoardDetails);
    userLeaderBoardDetails.sort((a,b) => b.total_cost - a.total_cost)
    res.status(200).json (userLeaderBoardDetails)
 }
 catch (err){
    console.log(err);
    res.status(500).json(err);
 }
}

module.exports = {
    getUserLeaderboard
}

const Expense= require('../models/expense');

const User= require('../models/user');

const sequelize = require('../util/database');

exports.postAddExpense = async (req,res,next) => {
    const t = await sequelize.transaction();

    try{
        const id = req.user.id;   //extracting the id from the global object req.user
        const description=req.body.description;
        const category=req.body.category;
        const amount=req.body.amount;
        if(amount == undefined || amount.length == 0){
            return res.status(400).json({success:false, message: "fields are not filled properly"});
        }
        const data= await Expense.create({ description:description, category:category, amount:amount, userId:id}, {transaction:t});
        const totalExpense = Number(req.user.totalExpense) + Number(amount);
        await User.update({totalExpense : totalExpense}, {where : {id:req.user.id}, transaction:t})
        await t.commit()
        res.status(201).json({newExpenseDetail: data});
    } catch(err){
        await t.rollback();
        res.status(500).json({error:err})
    }

}



exports.getExpenses = async (req,res,next)=>{

    try{
        // console.log(req.user)
        const id = req.user.id;   //extracting the id from the global object req.user
        // console.log(id);
        const expenses = await Expense.findAll({where : {userId:id}});  
        res.status(201).json({allExpenses : expenses});
    } catch(err){
        console.log('GET Expense is failing', JSON.stringify(err));
        res.status(500).json({error:err})
    }
}


exports.deleteExpense = async (req,res,next)=>{
    
    const t = await sequelize.transaction();
    
    try{
        
        if(req.params.id=='undefined'){
            console.log('Id is missing')
            return res.status(400).json({err: 'Id is missing'});
        }
        
        const uId = req.params.id;
        const expense= await Expense.findByPk(uId);
        const amount = expense.amount;
        const totalExpense = Number(req.user.totalExpense) - Number(amount);
        await User.update({totalExpense : totalExpense}, {where : {id:req.user.id}, transaction:t})
        await Expense.destroy({where: {id:uId},transaction:t});
      
        await t.commit()
        res.status(200).json({success:true, message: "Expense Deleted"});

    } catch(err){
        await t.rollback();
        console.log(err);
        res.status(500).json({error:err})
    }
}


const Expense= require('../models/expense');


exports.postAddExpense = async (req,res,next) => {

    try{
        const id = req.user.id;   //extracting the id from the global object req.user
        const description=req.body.description;
        const category=req.body.category;
        const amount=req.body.amount;
        const data= await Expense.create({ description:description, category:category, amount:amount, userId:id});
        res.status(201).json({newExpenseDetail: data});
    } catch(err){
        res.status(500).json({
            error:err
        })
    }
}


exports.getExpenses = async (req,res,next)=>{

    try{
        const id = req.user.id;   //extracting the id from the global object req.user
        const expenses = await Expense.findAll({where : {userId:id}});  
        res.status(201).json({allExpenses : expenses});
    } catch(err){
        console.log('GET Expense is failing', JSON.stringify(err));
        res.status(500).json({error:err})
    }
}


exports.deleteExpense = (req,res,next)=>{
    
    try{
        
        if(req.params.id=='undefined'){
            console.log('Id is missing')
            return res.status(400).json({err: 'Id is missing'});
        }
        
        const uId = req.params.id;
        Expense.destroy({where: {id:uId}});
        res.status(200);

    } catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
}



const express = require('express');

const sequelize= require('./util/database');

const cors = require('cors');

const dotenv = require('dotenv');

const app = express();

app.use(cors());

const userRoutes = require('./routes/user');

const expenseRoutes = require('./routes/expense');

const purchaseRoutes = require('./routes/purchase');

const premiumRoutes = require('./routes/premium');

const resetPasswordRoutes = require('./routes/resetpassword');

const User = require('./models/user');

const Expense = require('./models/expense');

const Order = require('./models/orders');

const Forgotpassword = require('./models/forgotpassword');

const Downloadedfiles = require('./models/downloadedfiles');

app.use(express.json());

app.use('/user', userRoutes);

app.use('/expense', expenseRoutes);

app.use('/purchase', purchaseRoutes);

app.use('/premium', premiumRoutes);

app.use('/password', resetPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(Downloadedfiles);
Downloadedfiles.belongsTo(User);

sequelize.sync()
.then(app.listen(3000))
.catch(err=> console.log(err));
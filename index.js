const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv= require('dotenv');
const session = require('express-session');
dotenv.config();
const userrouter = require('./routes/userroute');
const storerouter = require('./routes/storeroute');
const categoryroute = require('./routes/categoryroute');
const dburl = process.env.DB_URL;
mongoose.connect(dburl,{useNewUrlParser:true}).then(()=>{
    console.log('Database connected successfully');
}).catch(err=>{
    console.log(err.message);
})
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());
app.use(express.static('public'));
app.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized:false,
    resave:false
}))
app.use('/api',userrouter);
app.use('/api/store',storerouter);
app.use('/api/category',categoryroute)
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}


const express=require('express');
const app=express();
const path=require('path');
const ejsmate=require('ejs-mate');
const ExpressError=require('./utils/ExpressError');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
require('./auth');
require('dotenv').config();
const mongoSanitize=require('express-mongo-sanitize');
const helmet=require('helmet');
const MongoStore=require('connect-mongo');
const cookie = require('cookie');

app.use(flash());

const voteRoutes=require('./routes/vote');
const userRoutes=require('./routes/users');

const port=process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
const mongoose=require('mongoose');



const DBURL=process.env.DB_URL || 'mongodb://localhost:27017/voteBank';
mongoose.connect( DBURL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('mongodb connected');
})
.catch(err=>{
    console.log('Error!!',err);
})

const secret=process.env.secret || 'thisisasecret';



app.use(session(
    {  
        secret,
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({
        mongoUrl:DBURL,
        secret,
        
        touchAfter:24*60*60
     
     }),
     cookie:{
        httpOnly:true,
        expires:Date.now() + 1000*60*60*24*7,
         maxAge:1000*60*60*24*7
     }
  
}));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
app.use(mongoSanitize());
app.use(helmet({contentSecurityPolicy:false}));


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.engine('ejs',ejsmate);

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.currentUser=req.user;
    res.locals.error=req.flash('error');
    next();
})



app.use('/mainpage',voteRoutes);
app.use('/',userRoutes);

app.all('*',(req,res,next)=>{
    next(new ExpressError("page not found",404));
})

app.use((err,req,res,next)=>{
    const {statusCode=500}=err;
    if(!err.message) err.message='oh !boy something went wrong here';
    res.status(statusCode).render('errors',{err})
})

app.listen(port,(req,res)=>{
    console.log('port 3000 is On');
})
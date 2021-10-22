const mongoose=require('mongoose');
let Vote= require('./models/vote');

 const DBURL=process.env.DB_URL;
 
mongoose.connect(DBURL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('mongodb connected')
})
.catch(err=>{
    console.log("Error!",err);
});

const votedata=[{name:'pankaj',branch:'CSE',candidate:'ROHIT KUMAR',comment:'no doubt you are my best friend',email:'srz687989@gmail.com'}];
 Vote.insertMany(votedata)
.then(res=>{
    console.log(res);
})
.catch(err=>{
    console.log(err);
})




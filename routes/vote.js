const express=require('express');
const router=express.Router();
const User= require('../models/user');
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError');
const passport=require('passport');
const Vote=require('../models/vote');
const { isLoggedIn } = require('../middleware');
const civil=require('../civilarray');








router.get('/',catchAsync( async(req,res)=>{
    const votedata=await Vote.find({});

    res.render('voting/index',{votedata});
}));

router.get('/form',isLoggedIn, async(req,res)=>{
    

    res.render('voting/form',{civil});
})

router.get('/stats',isLoggedIn,catchAsync( async (req,res)=>{
    const votedata= await Vote.find({});
    res.render('voting/stats',{votedata});
}));

router.get('/comments/:votedperson',catchAsync( async(req,res)=>{
   const votedata= await  Vote.find({});
   const {votedperson}=req.params;
   
   res.render('voting/comments',{votedata,votedperson});
}));

router.get('/contact',(req,res)=>{
    res.render('voting/contact');
})

router.post('/', catchAsync( async (req,res)=>{
       const vote= await Vote.findOne({"email":`${req.body.email}`});
    
        
      if(vote){
         res.send('<div style="background-color:red; padding:100px;"><h1 style="text-align:center;"> Sorry!!! you cannot vote twice</h1></div>');
     }
       
      else{
    
        const votinginfo=await new Vote(req.body);

        await votinginfo.save();
         req.flash('success','You have successfully voted!');
        res.redirect('/mainpage');
    }



}));



module.exports=router;

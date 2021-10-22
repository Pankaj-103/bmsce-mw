const express=require('express');
const router=express.Router();
const User= require('../models/user');
const catchAsync=require('../utils/catchAsync');
const passport=require('passport');
const Vote=require('../models/vote');

// router.get('/register',(req,res)=>{
//     res.render('users/register');
// })

// router.post('/register', async (req,res,next)=>{
//     try{
//         const {email,username,password}=req.body;
//         const user=new User({email,username});
//         registeredUser= await User.register(user,password);
//         req.login(registeredUser,err=>{
//             if(err) return next(err);
//             req.flash('success','SRZ welcomes you');
//             res.redirect('/mainpage');
//         })

//     }catch(e){
//         req.flash('error',e.message);
//         res.redirect('/register');
//     }
// })

// router.get('/login',(req,res)=>{
//     res.render('users/login');
// });

// router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
//     req.flash('success','Welcome back');
//     res.redirect('/mainpage');

// });
router.get('/auth/google',
passport.authenticate('google',{scope:['email','profile']})
)

router.get('/google/callback',
 passport.authenticate('google',{
     successRedirect:'/mainpage',
     failureRedirect:'/auth/failure',
 })
);

router.get('/auth/failure',(req,res)=>{
    res.send('something went wrong..');
})


router.get('/logout',(req,res)=>{
    req.logout();
    

    req.flash('success','goodbye');
    res.redirect('/mainpage');
})


module.exports=router;
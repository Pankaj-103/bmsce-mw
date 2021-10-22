module.exports.isLoggedIn= (req,res,next)=>{
    //req.user ? next : res.sendStatus(401);
  
    if(req.isAuthenticated()){
       next()
    }else{
        
    res.status(403).send('<div style="background-color:red; padding:100px;"><h1 style="text-align:center;"> Please <a href="/auth/google">Login </a> to vote and see stats</h1></div>');
    }
};
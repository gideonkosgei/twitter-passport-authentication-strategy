const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login',(req,res)=>{
    res.render('login',{user:req.user});
});

// auth logout
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/'); 
}); 

//auth with twitter
router.get('/twitter',passport.authenticate('twitter',{
    scope : ['profile']
}));

//callback route for twitter to redirect to
router.get('/twitter/redirect',passport.authenticate('twitter'),(req,res)=>{
    //res.send(req.user); 
    res.redirect('/profile')

});
module.exports =router;


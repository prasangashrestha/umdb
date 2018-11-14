var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
//show register
router.get("/register",(req,res)=>{
    res.render("register");
})

router.post("/register", (req,res)=>{
    User.register(new User({username: req.body.username}), req.body.password, (err,user)=>{
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req,res,()=>{
            res.redirect("/movies")
        })
    })
})

//show login form
router.get("/login", (req,res)=>{
    res.render("login");
})
//handling login logic
router.post("/login", passport.authenticate("local",{
        successRedirect: "/movies",
        failureRedirect: "/login"
    }),(req,res)=>{
    
});

router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/movies");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
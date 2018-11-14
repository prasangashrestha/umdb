var express = require("express");
var router = express.Router();
var Movie = require("../models/movie");
var Comment = require("../models/comment");
 

router.get("/movies/:id/comments/new",isLoggedIn, (req,res)=>{
    Movie.findById(req.params.id, (err,movie)=>{
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {movie:movie});
        }
        
    })
   
});

router.post("/movies/:id/comments",isLoggedIn, (req,res)=>{
    
Movie.findById(req.params.id, (err,movie)=>{
    
    if(err){
        console.log(err);
        res.redirect("/movies");
    }else{
        Comment.create(req.body.comment,(err,comment)=>{ 
            if(err){
                console.log(err);
            }else{
                //add username and id to comment
                
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save()
                
                movie.comments.push(comment);
                movie.save();
                res.redirect('/movies/' + movie._id);
            }
        })
    }
})
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
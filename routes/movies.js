var express = require("express");
var router = express.Router();
var Movie = require("../models/movie");

 
 
router.get("/movies", (req,res) => {
    Movie.find({}, (err,allMovies)=>{
        if(err){
            console.log(err);
        }else{
            res.render("movies", {movies:allMovies});
        }
    })
        
});

router.post("/movies", isLoggedIn, (req,res) => {

    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
   
    var author = {
        id: req.user._id,
        username: req.user.username
    }
     var newMovie = {name: name, image:image, description:description, author:author}
    
    Movie.create(newMovie, (err,createdNow)=>{
        if(err){
            console.log(err);
        }else{
             res.redirect("movies");
        }
    });
});

router.get("/movies/new", isLoggedIn, (req,res) => {
    
   res.render("movies/new"); 

  
});

router.get("/movies/:id", (req,res)=>{
    Movie.findById(req.params.id).populate("comments").exec((err, foundMovie)=>{
        if(err){
            console.log(err);
        }else{
            console.log(foundMovie);
            res.render("movies/userShow", {movie: foundMovie} )
        }
    });
});

router.get("/movies/:id/edit", checkMovieOwnership, (req,res)=>{
     Movie.findById(req.params.id, (err,foundMovie)=>{
         res.render("movies/edit", {movie:foundMovie})
         
         });
    
});

router.put("/movies/:id", checkMovieOwnership, (req,res)=>{
    
    Movie.findByIdAndUpdate(req.params.id, req.body.movie, (err, updatedCampground)=>{
        if (err){
            res.redirect("/movies");
        }else {
            res.redirect("/movies/" + req.params.id);
        }
    })
})

router.delete("/movies/:id",checkMovieOwnership, (req,res)=>{
    Movie.findByIdAndRemove(req.params.id, (err) =>{
        if(err){
            res.redirect("/movies");
        }else{
            res.redirect("/movies");
        }
    })
})


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkMovieOwnership(req,res,next){
    if(req.isAuthenticated()){
     Movie.findById(req.params.id, (err,foundMovie)=>{
        if(err){
            res.redirect("back");
        }else{
            if(foundMovie.author.id.equals(req.user._id)){
              next();
            }else{
                res.redirect("back");
            }
        }
    });
    }else{
        res.redirect("back");
    }
}


module.exports = router;
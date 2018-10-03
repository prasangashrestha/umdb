var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var mongoose = require("mongoose");
var Movie = require("./models/movie");
var seedDB = require("./seeds");
var Comment = require("./models/comment");


mongoose.connect("mongodb://localhost/umdb");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

// Movie.create({
//     name: "Godfather",
//     image: "https://i.pinimg.com/originals/99/9b/cd/999bcd2f2af91cdd48e1293a2a7f8f86.jpg",
//     description: "Classic ganstar movie of the five families who rule over."
// }, (err, movie) =>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("New Movie");
//         console.log(movie);
//     }
    
// });

app.get("/", (req, res)=> {
    res.render("home");
});


app.get("/movies", (req,res) => {
    Movie.find({}, (err,allMovies)=>{
        if(err){
            console.log(err);
        }else{
            res.render("movies", {movies:allMovies});
        }
    })
        
});

app.post("/movies", (req,res) => {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newMovie = {name: name, image:image, description:description}
    
    Movie.create(newMovie, (err,createdNow)=>{
        if(err){
            console.log(err);
        }else{
             res.redirect("/movies");
        }
    });
    
   
});

app.get("/movies/new", (req,res) => {
    
   res.render("movies/new"); 

  
});

app.get("/movies/:id", (req,res)=>{
    Movie.findById(req.params.id).populate("comments").exec((err, foundMovie)=>{
        if(err){
            console.log(err);
        }else{
            console.log(foundMovie);
            res.render("movies/userShow", {movie: foundMovie} )
        }
    });
});

app.get("/movies/:id/comments/new", (req,res)=>{
    Movie.findById(req.params.id, (err,movie)=>{
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {movie:movie});
        }
        
    })
   
});

app.post("/movies/:id/comments", (req,res)=>{
    
Movie.findById(req.params.id, (err,movie)=>{
    
    if(err){
        console.log(err);
        res.redirect("/movies");
    }else{
        Comment.create(req.body.comment,(err,comment)=>{
            if(err){
                console.log(err);
            }else{
                movie.comments.push(comment);
                movie.save();
                res.redirect('/movies/' + movie._id);
            }
        })
    }
})
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The umdb server has started!");
});

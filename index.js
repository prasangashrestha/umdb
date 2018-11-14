var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Movie = require("./models/movie");
var seedDB = require("./seeds");
var User = require("./models/user");
var Comment = require("./models/comment");

var movieRoutes = require("./routes/movies");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");
    

mongoose.connect("mongodb://localhost/umdb");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "fdm",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})
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
app.use(movieRoutes);
app.use(indexRoutes);
app.use(commentRoutes);


app.get("/", (req, res)=> {
    res.render("/movies");
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The umdb server has started!");
});

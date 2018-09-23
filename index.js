var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", (req, res)=> {
    res.render("home");
});

app.get("/movies", (req,res) => {
    var movies = [
        {name: "Godfather", image: "https://i.pinimg.com/originals/99/9b/cd/999bcd2f2af91cdd48e1293a2a7f8f86.jpg"},
        {name: "Logan", image: "https://i.redd.it/6k7zcz25pa6y.jpg"},
        {name: "Avengers", image: "https://images-na.ssl-images-amazon.com/images/I/A1t8xCe9jwL._SY550_.jpg"}
        
        ]
        res.render("movies", {movies: movies});
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The umdb server has started!");
});
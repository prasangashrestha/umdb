var express = require("express");
var app = express();
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res)=> {
    res.render("home");
});
 var movies = [
        {name: "Godfather", image: "https://i.pinimg.com/originals/99/9b/cd/999bcd2f2af91cdd48e1293a2a7f8f86.jpg"},
        {name: "Logan", image: "https://i.redd.it/6k7zcz25pa6y.jpg"},
        {name: "Avengers", image: "https://images-na.ssl-images-amazon.com/images/I/A1t8xCe9jwL._SY550_.jpg"},
        {name: "Justice League", image: "https://is5-ssl.mzstatic.com/image/thumb/Video62/v4/4e/49/2f/4e492fb2-0b98-200c-6fcf-cba121e7a716/pr_source.lsr/1200x630bb.png"},
        {name: "Godfather", image: "https://i.pinimg.com/originals/99/9b/cd/999bcd2f2af91cdd48e1293a2a7f8f86.jpg"},
        {name: "Logan", image: "https://i.redd.it/6k7zcz25pa6y.jpg"},
        {name: "Avengers", image: "https://images-na.ssl-images-amazon.com/images/I/A1t8xCe9jwL._SY550_.jpg"},
        {name: "Justice League", image: "https://is5-ssl.mzstatic.com/image/thumb/Video62/v4/4e/49/2f/4e492fb2-0b98-200c-6fcf-cba121e7a716/pr_source.lsr/1200x630bb.png"}
        
        ]

app.get("/movies", (req,res) => {
   
        res.render("movies", {movies: movies});
});

app.post("/movies", (req,res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newMovie = {name: name, image:image}
    movies.push(newMovie);
    res.redirect("/movies");
});

app.get("/movies/new", (req,res) => {
   console.log("Rendering to the new page to add movies...");
   res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The umdb server has started!");
});

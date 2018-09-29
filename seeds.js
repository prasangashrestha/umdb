var mongoose = require("mongoose");
var Movie = require("./models/movie");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Godfather",
    image: "https://i.pinimg.com/originals/99/9b/cd/999bcd2f2af91cdd48e1293a2a7f8f86.jpg",
    description: "Classic ganstar movie of the five families who rule over."
    }
    
]
 
function seedDB(){
   //Remove all campgrounds
   Movie.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Movie.create(seed, function(err, movie){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    movie.comments.push(comment);
                                    movie.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;

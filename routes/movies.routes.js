// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

// all your routes here
router.get("/movies/create", (req,res,next)=> {
    Celebrity.find()
    .then( (celebritiesFromDB) => {
        res.render("movies/new-movie", {celebritiesArr: celebritiesFromDB});
      })
      .catch(err => {
        console.log("error getting movies from DB", err);
        next(err);
      })
  })   
     

router.post("/movies/create", (req,res,next)=> {

 const movieDetails = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
 }

Movie.create(movieDetails)
 .then(()=> {res.redirect("/movies")
 })
 .catch( err => {
    console.log("Something went wrong", err);
    next();
  });

});


// Iteration 7
router.get("/movies", (req,res,next)=>{
   Movie.find()
   .then((foundMovies)=>{res.render('movies/movies', {movies:foundMovies})})
   .catch((err)=>{console.log('there was an error', err)})
})

//Film details, Iteration 8 

router.get("/movies/:movieId", (req, res, next) => {
    const id = req.params.movieId;
  
    Movie.findById(id)
      .populate("cast")
      .then( movieDetails => {
        res.render("movies/movie-details", movieDetails);
      } )
      .catch( err => {
        console.log("error getting movie details from DB", err);
        next();
      })
  });


  //Iteration 9
  router.post("/movies/:movieId/delete", (req, res, next) => {
    Movie.findByIdAndDelete(req.params.movieId)
      .then(() => {
        res.redirect("/movies");
      })
      .catch(err => {
        console.log("Error deleting movie...", err);
      });
    });

    //Iteration10

    router.get("/movies/:movieId/edit", (req, res, next)=> {
        Movie.findById(req.params.movieId)
        .then(movieDetails => {
            res.render("movies/edit-movie", movieDetails)   
        })
        .catch(err=>{console.log(err)})
        })


    
    //UPDATE
    router.post("/movies/:movieId/edit", (req, res, next) => {
    const movieId = req.params;
  
    const newDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
  
    Movie.findByIdAndUpdate(movieId, newDetails)
      .then(() => {
        res.redirect(`/movies/${movieId}`);
      })
      .catch(err => {
        console.log("Error updating book...", err);
        next();
      });
  });
    

module.exports = router;
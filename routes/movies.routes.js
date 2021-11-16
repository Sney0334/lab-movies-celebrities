// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("./../models/Celebrity.model");
const Movie = require("./../models/Movie.model");

// all your routes here
router
.route("/create")
.get(async(req, res) => {
    try{
        const allCelebs = await Celebrity.find();
        res.render("movies/new-movie.hbs", {allCelebs});
    }catch(err){
        console.log(err)
    }
})
.post(async(req, res) => {
    try{
        const {title, genre, plot, cast} = req.body
        const createdMovie = await Movie.create({title, genre, plot, cast} )
        console.log(createdMovie)
        res.redirect("/movies")
    }catch(err){
        console.log(err)
    }
})
router.get("/", async(req,res)=>{
    try{
        const allMovies = await Movie.find().populate("cast")
        res.render("movies/movies", { allMovies })
    }catch(err){
        console.log(err)
    }

})
router.get("/:id", async(req,res)=>{
    try{
        const {id}= req.params
        const foundMovie = await Movie.findById(id).populate("cast")
        res.render("movies/movie-details", { movie: foundMovie })
    }catch(err){
        console.log(err)
    }
})

router.post("/:id/delete", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMovie = await Movie.findByIdAndDelete(id);
      console.log(deletedMovie);
      res.redirect("/movies");
    } catch (error) {
      console.log(error);
    }
  });





module.exports = router;

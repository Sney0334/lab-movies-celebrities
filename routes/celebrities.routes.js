const router = require("express").Router();
const Celebrity = require("./../models/Celebrity.model");



// celebrities/create
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    const createdCeleb = await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });
    console.log("createdCeleb: ", createdCeleb);
    res.redirect("/celebrities");
  } catch (error) {
    console.log(error);
     res.render("/celebrities/new-celebrity")
  }
});
router.get("/", async(req, res)=>{
    try{
        const allCelebs = await Celebrity.find();
        res.render('celebrities/celebrities',{all: allCelebs})
    }catch(error) {
        console.log(err)
    }
})

router
  .route("/:id/edit")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await Movie.findById(id).populate("cast");
      const allCelebs = await Celebrity.find();
      const filteredCelebs = allCelebs.filter((cel) => {
        return !movie.cast.find((cas) => cel.name === cas.name);
      });

      res.render("movies/edit-movie", { movie, allCelebs: filteredCelebs });
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    try {
      const { id } = req.params;
      const { title, genre, plot, cast } = req.body;
      const updatedMovie = await Movie.findByIdAndUpdate(
        id,
        { title, genre, plot, cast },
        { new: true }
      );
      res.redirect(`/movies/${id}`);
    } catch (error) {
      console.log(error);
    }
  });
module.exports = router;
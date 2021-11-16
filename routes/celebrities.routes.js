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
module.exports = router;
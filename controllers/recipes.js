const router = require('express').Router();

//import model 
const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

//Routes/API's / core functionality 
router.get('/', async (req, res) => {
    const recipes = await Recipe.find().populate('owner');
    res.render('recipes/index.ejs', {recipes});
})

router.get('/new', async (req, res) => {
    res.render('recipes/new.ejs');
})

router.post('/', async (req, res) => {
    req.body.owner = req.session.user._id;
    await Recipe.create(req.body);
    res.redirect('recipes');
})

router.get('/:recipeId', async (req, res) => {
    const recipe = await Recipe.findById(req.params.recipeId).populate('owner');
    const Lngredients = recipe.lngredients.some((user) => 
        user.equals(req.session.user._id)
    )
    res.render('recipes/show.ejs' , {recipe, lngredients});
})

module.exports = router;
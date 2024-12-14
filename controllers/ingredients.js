// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Ingredient = require('../models/ingredient.js');

// router logic will go here - will be built later on in the lab

//root
router.get('/', async(req,res)=>{
  const ingredients = await Ingredient.find()
  res.render('ingredients/index.ejs',{ingredients})
})

//add new
router.get('/new',async(req,res)=>{
  res.render('ingredients/new.ejs')
})

router.post('/', async(req,res)=>{
  
  const existingIngredient = await Ingredient.findOne({name:req.body.name.toLowerCase()})
  if(existingIngredient){
    res.send("Ingredient already exist.")
  }else{
    req.body.owner = req.session.user._id
    await Ingredient.create(req.body)
    res.redirect('/ingredients')
  }


})



module.exports = router;
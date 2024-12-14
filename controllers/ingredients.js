
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Ingredient = require('../models/ingredient.js');



router.get('/', async(req,res)=>{
  const ingredients = await Ingredient.find()
  res.render('ingredients/index.ejs',{ingredients})
})

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
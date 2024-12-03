const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    instructions: {
        type: String,
        required: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ingredient'
    }]
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
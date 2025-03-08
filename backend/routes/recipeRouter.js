const express = require("express");
const { RecipeModal } = require("../modals/recipeModal");
const { userModal } = require("../modals/userModal");

const recipeRouter = express.Router();

recipeRouter.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=6ac2eea7&app_key=ea3184884d84f08bba3e75f32d6e381b`);
      const data = await response.json();
      res.json(data.results);
    } catch (error) {
      res.status(500).json({ error: 'Recipe search failed' });
    }
  });
  
  recipeRouter.post('/save', async (req, res) => {
    try {
      const { userId, recipe } = req.body;
      const newRecipe = new RecipeModal({ ...recipe, user: userId });
      await newRecipe.save();
      await User.findByIdAndUpdate(userId, { $push: { savedRecipes: newRecipe._id } });
      res.json({ message: 'Recipe saved' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save recipe' });
    }
  });
  
  recipeRouter.get('/saved/:userId', async (req, res) => {
    try {
      const user = await userModal.findById(req.params.userId).populate('savedRecipes');
      res.json(user.savedRecipes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch saved recipes' });
    }
  });


  module.exports = {
    recipeRouter
  }
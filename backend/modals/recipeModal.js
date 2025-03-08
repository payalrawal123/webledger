const mongoose = require("mongoose");


const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    summary: { type: String },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  const RecipeModal = mongoose.model('Recipe', RecipeSchema);

  module.exports = {
    RecipeModal
  }
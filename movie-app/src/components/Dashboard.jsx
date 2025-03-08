import React, { useEffect, useState } from 'react'
import Recipe from './Recipe';

const Dashboard = () => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('chicken');
  
    useEffect(() => {
      getRecipes();
    }, [query]);
  
    const getRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/recipes/searce?type=public&q=chicken&app_id=6ac2eea7&app_key=%20ea3184884d84f08bba3e75f32d6e381b`
        );
        const data = await response.json();
        
        if (data.hits && data.hits.length > 0) {
          setRecipes(data.hits);
        } else {
          setRecipes([]); // Handle empty response
          console.warn('No recipes found for:', query);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    
  
    const updateSearch = (e) => {
      setSearch(e.target.value);
    };
  
    const getSearch = (e) => {
      e.preventDefault();
      if (search.trim()) {
        setQuery(search);
        setSearch('');
      }
    };
  
    return (
      <div className="App">
        <form className="search-form" onSubmit={getSearch}>
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        <div className="recipes">
    {recipes.length > 0 ? (
      recipes.map((item) => (
        <Recipe
          key={item.recipe.label}
          title={item.recipe.label}
          calories={item.recipe.calories}
          image={item.recipe.image}
          ingredients={item.recipe.ingredients}
        />
      ))
    ) : (
      <p>No recipes found. Try a different search term.</p>
    )}
  </div>
  
      </div>
    );
}

export default Dashboard

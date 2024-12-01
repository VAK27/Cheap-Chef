const API_KEY = "3884f9775c7143fa8258b1aa592f5900";  // Replace with your actual API key

document.getElementById("suggestButton").addEventListener("click", async function () {
  const input = document.getElementById("ingredientsInput").value.toLowerCase();
  const ingredients = input.split(",").map(ing => ing.trim()).join(",");

  const results = document.getElementById("recipeResults");
  results.innerHTML = "<p>Loading recipes...</p>";

  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${API_KEY}`);
    const recipes = await response.json();

    if (recipes.length > 0) {
      results.innerHTML = `<h3>Possible Recipes:</h3><ul>${recipes.map(recipe => `<li><strong>${recipe.title}</strong><br><img src="${recipe.image}" alt="${recipe.title}" width="100"><br><a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-").toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a></li>`).join("")}</ul>`;
    } else {
      results.innerHTML = "<p>No matching recipes found. Try adding more ingredients!</p>";
    }
  } catch (error) {
    results.innerHTML = "<p>Failed to load recipes. Please try again later.</p>";
    console.error("Error fetching recipes:", error);
  }
});

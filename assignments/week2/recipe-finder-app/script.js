const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click",() => {
    searchRecipe()
})

async function searchRecipe() {
  const query = searchInput.value;
  const resultsDiv = document.getElementById("results");


  resultsDiv.innerHTML = "";


  if (!query) {
    resultsDiv.innerHTML = "<p class='error'>Please enter something to search.</p>";
    return;
  }

  try {

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();

    console.log("API Response:", data); // manual testing

  
    if (!data.meals) {
      resultsDiv.innerHTML = "<p class='error'>No recipe found.</p>";
      return;
    }

    
    data.meals.forEach(meal => {
      const item = document.createElement("div");
      item.className = "card";

      item.innerHTML = `
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" class="thumb">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p>${meal.strInstructions.substring(0, 150)}...</p>
      `;

      resultsDiv.appendChild(item);
    });

  } catch (error) {
    console.log("Error occurred:", error);
    resultsDiv.innerHTML = "<p class='error'>Something went wrong. Check console.</p>";
  }
}

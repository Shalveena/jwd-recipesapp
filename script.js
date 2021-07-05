"use strict";

// Target form elements
const form = document.querySelector(".form");
const recipeTitle = document.querySelector("#recipe-title");
const ingredients = document.querySelector("#ingredients");
const method = document.querySelector("#method");

// Function to add new recipe:
const recipes = [];

const addRecipe = function (recipeTitle, ingredients, method) {
  const newRecipe = {
    recipeTitle: recipeTitle,
    ingredients: ingredients,
    method: method,
  };

  recipes.push(newRecipe);
};

// Function to create html of the new recipe:
const createRecipeHtml = (recipeTitle, ingredients, method) => {
  const html = `
    <section class="card my-5">
    <div class="card-body">
      <div class="row">
        <div class="col">
          <h4 class="card-title">
          ${recipeTitle}
          </h4>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h5 class="card-text">Ingredients</h5>
          ${ingredients}
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h5 class="card-text">Method</h5>
          <!-- Accordion -->
          <div class="accordion accordion-flush" id="accordionFlushCard">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingCard1">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse1" aria-expanded="false" aria-controls="flush-collapse1">
                See more
                </button>
              </h2>
            <div id="flush-collapse1" class="accordion-collapse collapse" aria-labelledby="flush-headingCard1" data-bs-parent="#accordionFlushCard">
              <div class="accordion-body">
              ${method}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

`;
  return html;
};

// Function to render recipes:
const render = function () {
  let recipesHTMLArr = [];

  // For each recipe from the recipes array, create the html and push it to the recipesHTMLArr. Then, join the recipes from recipesHTMLArr into a string and change the HTML code.
  recipes.forEach((recipe) => {
    const recipeHTML = createRecipeHtml(
      recipe.recipeTitle,
      recipe.ingredients,
      recipe.method
    );
    recipesHTMLArr.push(recipeHTML);
  });

  const recipesList = document.querySelector("#recipes-list");
  recipesList.innerHTML = recipesHTMLArr.join("\n");
};

// Function to check validation
form.addEventListener("submit", function (event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  form.classList.add("was-validated");

  // If form valid, add recipe
  if (form.checkValidity()) {
    addRecipe(recipeTitle.value, ingredients.value, method.value);
    console.log(recipes);
    render();
    event.preventDefault();
  }
});
//TODO: figure out how to close modal when Add button clicked and form valid.
// TODO:Remove ability to exit modal when clicked outside
// TODO: Add clear button
// TODO: Add delete button to allow deletion of recipes
// TODO: Save recipes in local storage
// TODO: Create readme showing steps to run the app locally, list of tech used, section describing the requirements and how you met them.

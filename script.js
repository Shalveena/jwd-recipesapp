"use strict";

// Target form elements
const form = document.querySelector(".form");
const recipeTitle = document.querySelector("#recipe-title");
const ingredients = document.querySelector("#ingredients");
const method = document.querySelector("#method");

const newRecModal = new bootstrap.Modal(
  document.getElementById("NewRecModal"),
  {}
);

// Function to add new recipe:
let recipes = [];
let id = 0;

const addRecipe = function (recipeTitle, ingredients, method) {
  const newRecipe = {
    id: id++,
    recipeTitle: recipeTitle,
    ingredients: ingredients,
    method: method,
  };

  recipes.push(newRecipe);
};

// Function to create html of the new recipe:
const createRecipeHtml = (id, recipeTitle, ingredients, method) => {
  const html = `
    <section class="card my-5" data-recipe-id="${id}">
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
          <button type="button" class="btn btn-primary mt-2 delete-btn">Delete</button>
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
      recipe.id,
      recipe.recipeTitle,
      recipe.ingredients,
      recipe.method
    );
    recipesHTMLArr.push(recipeHTML);
  });

  const recipesList = document.querySelector("#recipes-list");
  recipesList.innerHTML = recipesHTMLArr.join("\n");
};

// // Function to delete recipe:
// const deleteRecipe = function (recipeId) {
//   const newRecipesArr = recipes.filter((recipe) => recipe.id !== recipeId);
//   recipes = newRecipesArr;
// };

// const deleteBtn = document.querySelector(".delete-btn");
// console.log(deleteBtn);
// deleteBtn.addEventListener("click", (event) => {
//   const clickedBtn = event.target;
//   const recipeID = parseInt(clickedBtn.dataset.recipeId);
//   deleteRecipe(recipeID);
// });

// Function to check validation
form.addEventListener("submit", function (event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  form.classList.add("was-validated");

  // If form valid, add recipe and render
  if (form.checkValidity()) {
    addRecipe(recipeTitle.value, ingredients.value, method.value);
    console.log(recipes);
    // close modal
    //document.querySelector("#NewRecModal").hide();
    // reset form
    form.reset();
    newRecModal.hide();
    render();
    event.preventDefault();
  }
});

// Reset form fields when reset button clicked

// TODO:Remove ability to exit modal when clicked outside
// TODO: Add clear button (how to unclick it, and it doesn't clear error messages!)
// TODO: Add delete button to allow deletion of recipes
// TODO: Save recipes in local storage
// TODO: Create readme showing steps to run the app locally, list of tech used, section describing the requirements and how you met them.

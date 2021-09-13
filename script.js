"use strict";

// Target form elements
const form = document.querySelector(".form");
const recipeTitle = document.querySelector("#recipe-title");
const ingredients = document.querySelector("#ingredients");
const method = document.querySelector("#method");

// Need this line of code for the add button to close the modal
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
          <button type="button" class="btn btn-primary mt-2 delete-btn" data-recipe-id="${id}">Delete</button>
        </div>
      </div>
    </div>
  </section>

`;
  return html;
};

// Function to delete recipe:
const deleteRecipe = function (recipeId) {
  const newRecipesArr = recipes.filter((recipe) => recipe.id !== recipeId);
  recipes = newRecipesArr;
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

  // create an event listener for the delete button. When clicked, delete the recipe
  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach((deleteBtn) =>
    deleteBtn.addEventListener("click", (event) => {
      const clickedBtn = event.target;
      const recipeID = parseInt(clickedBtn.dataset.recipeId);
      deleteRecipe(recipeID);
      //IMP: need to call render function again so that it can render new recipes and create new event handlers for the delete buttons
      render();
      saveLocal();
    })
  );
};

// Function to save to local storage
const saveLocal = function () {
  const recipesJson = JSON.stringify(recipes);
  // Store the string in localStorage (key:'recipes', value: 'tasksJson')
  localStorage.setItem("recipes", recipesJson);
  // Convert id variable to string IMP: need to store the id variable in local storage because when we later reload the page, the id variable will be set to 0 again, but we want to load from local storage and make sure the new recipes that are added afterward don't start with id 0 again.
  const localId = JSON.stringify(id);
  // Store in localStorage.
  localStorage.setItem("id", localId);
};

// Function to load from local storage
const loadLocal = function () {
  // check if any recipes already in local storage. If so, get it, change it back into an array and assign it to the recipes array.
  if (localStorage.getItem("recipes")) {
    const recipesJson = localStorage.getItem("recipes");
    recipes = JSON.parse(recipesJson);
  }

  //do same with id
  if (localStorage.getItem("id")) {
    const localId = localStorage.getItem("id");
    id = parseInt(localId);
  }
};

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
    saveLocal();
    // close modal
    form.reset();
    newRecModal.hide();
    render();

    event.preventDefault();
  }
});

loadLocal();
render();

// Reset form fields when reset button clicked

// TODO: Improve clear button (how to unclick it, and it doesn't clear error messages!)
// TODO: How to add images to ReadMe
// TODO: Improve validation
// TODO: Make lines on new line in text area (https://www.geeksforgeeks.org/how-to-add-line-breaks-to-an-html-textarea/)

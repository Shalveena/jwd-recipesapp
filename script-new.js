"use strict";

// ---- DOM Elements --------------------------------------------------

// Buttons
const newRecipeBtn = document.querySelector("#new-recipe-btn");
const clearBtn = document.querySelector("#clear-btn");
const closeModalBtn = document.querySelector("#close-modal");

// Form elements
const modal = document.querySelector("#form-container");
const formTitle = document.querySelector("#title");
const formIngredients = document.querySelector("#ingredients");
const formMethod = document.querySelector("#method");

// Other
const overlay = document.querySelector("#overlay");

// Node Lists
const smallElNodeList = modal.querySelectorAll("small");
// const formControlNodeList = modal.querySelectorAll(".form-control");

// ---- Function ------------------------------------------------------

// Open Modal
const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// Close Modal

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Function to remove class

const removeClass = (text, ...inputs) => {
  inputs.forEach((input) => {
    input.classList.remove(text);
  });
};

// Function to add class

const addClass = (className, ...inputs) => {
  inputs.forEach((input) => {
    input.classList.add(className);
  });
};

// Function to clear input fields
const clearFields = (...inputs) => {
  inputs.forEach((input) => {
    input.value = "";
  });
};

// Function to hide text

const hideErrorText = (nodeList) => {
  for (let i = 0; i < nodeList.length; i++) {
    addClass("hidden", nodeList[i]);
  }
};

// ---- Validation ----

// Show error

const showError = (input, message) => {
  const small = document.querySelector(`#small-${input.id}`);

  input.classList.remove("success");
  input.classList.add("error");

  small.classList.remove("hidden");
  small.textContent = message;
};

// Show success

const showSuccess = (input) => {
  const small = document.querySelector(`#small-${input.id}`);

  input.classList.remove("error");
  input.classList.add("success");

  small.classList.remove("hidden");
  small.textContent = "All good :)";
};

// Check required

const checkRequired = (...inputs) => {
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${reformatter(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Reformat word

const reformatter = (element) => {
  return element.id.charAt(0).toUpperCase() + element.id.slice(1);
};

// Check length

const checkLength = (input, min) => {
  if (input.value.trim().length !== 0 && input.value.trim().length < min) {
    console.log("length being checked");
    showError(
      input,
      `${reformatter(input)} must be more than ${min} characters`
    );
  }
};

// ---- Adding, Rendering & Deleting Recipes ----

// Add Recipe
let recipesArr = [];
let id = 0;

const addRecipe = (title, ingredients, method) => {
  const newRecipe = {
    id: id++,
    title: title,
    ingredients: ingredients,
    method: method,
  };

  recipesArr.push(newRecipe);
  console.log(recipesArr);
};

// Delete Recipe

const deleteRecipe = function (recipeId) {
  console.log("delete recipe function being called");
  console.log(recipeId);
  const newRecipesArr = recipesArr.filter((recipe) => recipe.id !== recipeId);
  recipesArr = newRecipesArr;
};

// Create the HTML

const createHTML = (id, title, ingredients, method) => {
  const html = `<article class="card-container" data-id="${id}">
        <h2 class="recipe-title">${title}</h2>

        <div class="recipe-contents">
          <section>
            <h3>Ingredients</h3>
            <p>${ingredients}</p>
          </section>
          <section>
            <h3>Method</h3>
            <p>${method}</p>
          </section>
          <section>
            <button class="delete-btn" data-id="${id}" type="button">Delete</button>
          </section>
        </div>
      </article>`;
  return html;
};

// Render function

const render = () => {
  let htmlArr = [];

  // For each recipe from recipesArr,
  // make the html and push the html
  //into an array (htmlArr).

  recipesArr.forEach((recipe) => {
    htmlArr.push(
      createHTML(recipe.id, recipe.title, recipe.ingredients, recipe.method)
    );
  });

  // Then change the actual html file.
  // Each element from htmlArr is joined
  // into a string,
  // each element starting at a new line.

  let recipesList = document.querySelector("#cards-container");
  recipesList.innerHTML = htmlArr.join("\n");

  // Create event listener on delete buttons
  const deleteBtns = recipesList.querySelectorAll(".delete-btn");

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      console.log("Delete button being clicked");
      deleteRecipe(parseInt(deleteBtn.dataset.id));

      render();
    });
  });
};

// ---- Local Storage ----

// Save to Local Storage

// Load from Local Storage

// ---- Event Handlers ------------------------------------------------

// Event listener on the form for submit event
modal.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();

  // form validation
  checkRequired(formTitle, ingredients, method);
  checkLength(formTitle, 3);
  checkLength(formIngredients, 10);
  checkLength(formMethod, 10);

  // if validation passes, add recipe & render it

  if (
    formTitle.classList.contains("success") &&
    formIngredients.classList.contains("success") &&
    formMethod.classList.contains("success")
  ) {
    addRecipe(formTitle.value, formIngredients.value, formMethod.value);
    render();

    closeModal();
    removeClass("error", formTitle, formIngredients, formMethod);
    removeClass("success", formTitle, formIngredients, formMethod);
    clearFields(formTitle, formIngredients, formMethod);
    hideErrorText(smallElNodeList);
  }
});

// Event listener for Add New Recipe Button (to open modal)
newRecipeBtn.addEventListener("click", openModal);

// Event listener to X button (to close modal)
closeModalBtn.addEventListener("click", closeModal);

// Event listener to overlay (to hide it)
overlay.addEventListener("click", closeModal);

// Event listener to clear the formatting of input boxes when clear button clicked
clearBtn.addEventListener("click", (e) => {
  hideErrorText(smallElNodeList);

  removeClass("error", formTitle, formIngredients, formMethod);
  removeClass("success", formTitle, formIngredients, formMethod);
});

render();

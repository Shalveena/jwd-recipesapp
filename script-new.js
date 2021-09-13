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

const removeClass = (text, ...input) => {
  input.forEach((input) => {
    input.classList.remove(text);
  });
};

// Function to add class

const addClass = (text, ...input) => {
  input.forEach((input) => {
    input.classList.add(text);
  });
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

const showSuccess = (input, index) => {
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

const addRecipe = (recipeTitle, ingredients, method) => {
  const newRecipe = {
    id: id++,
    recipeTitle: recipeTitle,
    ingredients: ingredients,
    method: method,
  };

  recipesArr.push(newRecipe);
};

//

// ---- Event Handlers ------------------------------------------------

// Event listener on the form for submit event
modal.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();
  checkRequired(formTitle, ingredients, method);
  checkLength(formTitle, 3);
  checkLength(formIngredients, 10);
  checkLength(formMethod, 10);
});

// Event listener for Add New Recipe Button (to open modal)
newRecipeBtn.addEventListener("click", openModal);

// Event listener to X button (to close modal)
closeModalBtn.addEventListener("click", closeModal);

// Event listener to overlay (to hide it)
overlay.addEventListener("click", closeModal);

// Event listener to clear the formatting of input boxes when clear button clicked
clearBtn.addEventListener("click", (e) => {
  for (let i = 0; i < smallElNodeList.length; i++) {
    addClass("hidden", smallElNodeList[i]);
  }

  removeClass("error", formTitle, formIngredients, formMethod);
  removeClass("success", formTitle, formIngredients, formMethod);
});

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

// Function to check validation
form.addEventListener("submit", function (event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  form.classList.add("was-validated");

  if (form.checkValidity()) {
    addRecipe(recipeTitle.value, ingredients.value, method.value);
    console.log(recipes);
    event.preventDefault();
  }
});
//TODO: figure out how to close modal when Add button clicked and form valid.
// TODO:Remove ability to exit modal when clicked outside
// TODO: Add clear button

"use strict";

// Target form elements
const form = document.querySelector(".form");
const recipeTitle = document.querySelector("#recipe-title");
const ingredients = document.querySelector("#ingredients");
const method = document.querySelector("#method");

// Function to add new recipe:

// Function for when the form fields are empty:

let validForm = true;

form.addEventListener("submit", function (event) {
  if (!recipeTitle.value) {
    recipeTitle.style.border = "solid #FF3C3C";
    event.preventDefault();
    validForm = false;
  }
  if (!ingredients.value) {
    ingredients.style.border = "solid #FF3C3C";
    event.preventDefault();
    validForm = false;
  }
  if (!method.value) {
    method.style.border = "solid #FF3C3C";
    event.preventDefault();
    validForm = false;
  }

  // If the form is valid, add the new recipe and render it
});

// form.addEventListener("submit", function (event) {
//   if (!form.checkValidity()) {
//     event.preventDefault();
//     event.stopPropagation();
//   }
// });

// const addBtn = document.querySelector(".add-btn");
// console.log(addBtn);

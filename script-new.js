"use strict";

// ---- DOM Elements --------------------------------------------------

// Buttons
const newRecipeBtn = document.querySelector("#new-recipe-btn");
const clearBtn = document.querySelector("#clear-btn");
const closeModalBtn = document.querySelector("#close-modal");

// Form elements
const modal = document.querySelector(".form-container");
const formTitle = document.querySelector("#title");
const formIngredients = document.querySelector("#ingredients");
const formMethod = document.querySelector("#method");

// Other
const overlay = document.querySelector("#overlay");

// Node Lists
const smallElNodeList = modal.querySelectorAll("small");
const formControlNodeList = modal.querySelectorAll("#form-control");

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
  for (let i = 0; i < smallElNodeList.length; i++) {
    smallElNodeList[i].classList.add("hidden");
  }
};

// ---- Validation ----

// Check required

const checkRequired = (...inputs) => {
  inputs.forEach((input, index) => {
    if (input.value.trim() === "") {
      showError(input, index, `${reformatter(input)} is required`);
    } else {
      showSuccess(input, index);
    }
  });
};

// Reformat word

const reformatter = (element) => {
  return element.id.charAt(0).toUpperCase() + element.id.slice(1);
};

// Check length

const checkLength = (input, min) => {
  console.log("checklength called but length not checked");
  if (input.value.trim() !== "" && input.value.trim() < min) {
    console.log("length being checked");
    showError(
      input,
      index,
      `${reformatter(input)} must be more than ${min} characters`
    );
  }
};

const showError = (input, message) {
  const smallElem = modal.querySelector(`small[for='${input.id}']`);
  smallElem.classList.add('error');
  input.classList.add('error')

};

// Show error

const showError = (input, index, message) => {
  const formControl = formControlNodeList[index];
  const small = formControl.querySelector("small");

  formControl.classList.remove("success");
  formControl.classList.add("error");

  small.classList.remove("hidden");
  small.textContent = message;
};

// Show success

const showSuccess = (input, index) => {
  const formControl = formControlNodeList[index];
  const small = formControl.querySelector("small");

  formControl.classList.remove("error");
  formControl.classList.add("success");

  small.classList.remove("hidden");
  small.textContent = "All good :)";
};

// ---- Event Handlers ------------------------------------------------

// Event listener for Add New Recipe Button (to open modal)
newRecipeBtn.addEventListener("click", openModal);

// Event listener to X button (to close modal)
closeModalBtn.addEventListener("click", closeModal);

// Event listener to overlay (to hide it)
overlay.addEventListener("click", closeModal);

// Event listener on the form for submit event
modal.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();
  checkRequired(formTitle, ingredients, method);
  checkLength(formTitle, 3);
});

// Event listener to clear the formatting of input boxes when clear button clicked
clearBtn.addEventListener("click", (e) => {
  for (let i = 0; i < formControlNodeList.length; i++) {
    formControlNodeList[i].classList.remove("error");
    formControlNodeList[i].classList.remove("success");

    smallElNodeList[i].classList.add("hidden");
  }
});

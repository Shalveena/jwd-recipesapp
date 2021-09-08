"use strict";

// ---- DOM Elements --------------------------------------------------

const newRecipeBtn = document.querySelector("#new-recipe-btn");
const modal = document.querySelector(".form-container");
const overlay = document.querySelector("#overlay");
// const closeModalBtn = doucment.querySelector("#close-modal");

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
// ---- Event Handlers ------------------------------------------------

// Event listener for Add New Recipe Button (to open modal)
newRecipeBtn.addEventListener("click", openModal);

// Event listener to X button (to close modal)
// closeModalBtn.addEventListener("click", closeModal);

// Event listener to overlay (to hide it)
overlay.addEventListener("click", closeModal);

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

// ---- Functions ------------------------------------------------------

// Removes the specified class from the DOM elements
const removeClass = (className, ...inputs) => {
  inputs.forEach((input) => {
    input.classList.remove(className);
  });
};

// Adds the specified class to the DOM elements
const addClass = (className, ...inputs) => {
  inputs.forEach((input) => {
    input.classList.add(className);
  });
};

// Removes 'hidden' class from the modal and overlay, so that they will be displayed.
const openModal = () => {
  removeClass("hidden", modal, overlay);
  // modal.classList.remove("hidden");
  // overlay.classList.remove("hidden");
};

// Hides the modal and overlay
const closeModal = () => {
  addClass("hidden", modal, overlay);
  // modal.classList.add("hidden");
  // overlay.classList.add("hidden");
};

// Clears the content of the input fields
const clearFields = (...inputs) => {
  inputs.forEach((input) => {
    input.value = "";
  });
};

// Hides the elements specified in the nodelist, by adding the "hidden" class to it
const hideElement = (nodeList) => {
  for (let i = 0; i < nodeList.length; i++) {
    addClass("hidden", nodeList[i]);
  }
};

// ---- Validation ----

// Removes the "success" class from the specified input.
// Adds the "error" class to the specified input, which gives the specified inputs a red border and makes their sibling small element's text red.
// Also displays the small element (by removing "hidden" class) and changes it's content to the specified message.
const showError = (input, message) => {
  const small = document.querySelector(`#small-${input.id}`);

  removeClass("success", input);
  addClass("error", input);
  removeClass("hidden", small);

  small.textContent = message;
};

// Removes the "error" class from the specified inputs.
// Adds the "success" class to the specified inputs, which gives the specified inputs a green border and makes their sibling small element's text green.
// Also displays the small element (by removing "hidden" class)
// And changes it's content to "Ann good :)".
const showSuccess = (input) => {
  const small = document.querySelector(`#small-${input.id}`);

  removeClass("error", input);
  addClass("success", input);
  removeClass("hidden", small);

  small.textContent = "All good :)";
};

// Checks whether the value of the specific input from the inputs array is empty.
// If it is empty, calls the showError function (above).
// If it is not empty, calls the showSuccess function (above).
const checkRequired = (...inputs) => {
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${reformatter(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Reformats the first letter of specified element's id and returns it.
const reformatter = (element) => {
  return element.id.charAt(0).toUpperCase() + element.id.slice(1);
};

// Checks whether the input has content and whether the content is less than the minimum specified.
// If it has content, but the content is less than the minimum, it calls the showError function.
const checkLength = (input, min) => {
  if (input.value.trim().length !== 0 && input.value.trim().length < min) {
    showError(
      input,
      `${reformatter(input)} must be more than ${min} characters`
    );
  }
};

// ---- Adding, Rendering & Deleting Recipes ----

let recipesArr = [];
let id = 0;

// Creates a new recipe object and pushes it to the recipes array.
// Increments the id variable.
const addRecipe = ({ title, ingredients, method }) => {
  const newRecipe = {
    id: id,
    title: title,
    ingredients: ingredients,
    method: method,
  };

  recipesArr.push(newRecipe);
  id += 1;
};

// Modifies the recipes array to exclude the recipe with the specified id.
const deleteRecipe = function (recipeId) {
  const newRecipesArr = recipesArr.filter((recipe) => recipe.id !== recipeId);
  recipesArr = newRecipesArr;
};

// Creates the HTML for the recipe card
const createHTML = ({ id, title, ingredients, method }) => {
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

// Renders the html for the recipe cards, and sets event listeners on the delete bttons
const render = () => {
  let htmlArr = [];

  // For each recipe from recipesArr, make the html and push the html into an array (htmlArr).

  recipesArr.forEach((recipe) => {
    htmlArr.push(
      createHTML({
        id: recipe.id,
        title: recipe.title,
        ingredients: recipe.ingredients,
        method: recipe.method,
      })
    );
  });

  // Then change the actual html file.
  // Each element from htmlArr is joined into a string, each element starting at a new line.
  let recipesList = document.querySelector("#cards-container");
  recipesList.innerHTML = htmlArr.join("\n");

  // Create event listener on delete buttons.
  // The event handler function calls the deleteRecipe function and passes in the particular delete button's id so that it can be compared with the ids in the recipes array.
  const deleteBtns = recipesList.querySelectorAll(".delete-btn");

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      deleteRecipe(parseInt(deleteBtn.dataset.id));

      // Call functions to save to local storage and render again.
      saveLocal();
      render();
    });
  });
};

// Resetting the form by removing the "error" and "success" classes from input fields and hidding the error text.

const resetForm = () => {
  removeClass("error", formTitle, formIngredients, formMethod);
  removeClass("success", formTitle, formIngredients, formMethod);
  hideElement(smallElNodeList);
};
// ---- Local Storage ----

// Changes the recipes array to a JSON object and saves it to Local Storage under the "recipes" key. Same for the id variable.
const saveLocal = () => {
  // Store the string in localStorage
  // (key:'recipes', value: 'recipesJson')

  const recipesJson = JSON.stringify(recipesArr);
  localStorage.setItem("recipes", recipesJson);

  // Convert id variable to string
  // IMP: need to store the id variable in local storage because when we later reload the page, the id variable will be set to 0 again, but we want to load from local storage and make sure the new recipes that are added afterward don't start with id 0 again.

  const localId = JSON.stringify(id);
  localStorage.setItem("id", localId);
};

// Load recipes and id from Local Storage
const loadLocal = () => {
  // check if any recipes already in local storage. If so, get it, change it back into an array and assign it to recipesArr.

  if (localStorage.getItem("recipes")) {
    const recipesJson = localStorage.getItem("recipes");
    recipesArr = JSON.parse(recipesJson);
  }

  // do same with id
  if (localStorage.getItem("id")) {
    const localId = localStorage.getItem("id");
    id = parseInt(localId);
  }
};

// ---- Event Handlers ------------------------------------------------

// Event listener on the form for submit event
modal.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();

  // form validation

  checkRequired(formTitle, formIngredients, formMethod);
  checkLength(formTitle, 3);
  checkLength(formIngredients, 10);
  checkLength(formMethod, 10);

  // if validation passes, add recipe & render it

  if (
    formTitle.classList.contains("success") &&
    formIngredients.classList.contains("success") &&
    formMethod.classList.contains("success")
  ) {
    addRecipe({
      title: formTitle.value,
      ingredients: formIngredients.value,
      method: formMethod.value,
    });
    render();

    // save to local storage
    saveLocal();

    // close modal and clear form
    closeModal();
    resetForm();
    // removeClass("error", formTitle, formIngredients, formMethod);
    // removeClass("success", formTitle, formIngredients, formMethod);
    clearFields(formTitle, formIngredients, formMethod);
    // hideErrorText(smallElNodeList);
  }
});

// Event listener for Add New Recipe Button (to open modal)
newRecipeBtn.addEventListener("click", openModal);

// Event listener to X button (to close modal)
closeModalBtn.addEventListener("click", closeModal);

// Event listener to overlay (to hide it)
overlay.addEventListener("click", closeModal);

// Event listener to clear the formatting of input boxes when clear button clicked
clearBtn.addEventListener("click", () => {
  resetForm();

  // hideErrorText(smallElNodeList);

  // removeClass("error", formTitle, formIngredients, formMethod);
  // removeClass("success", formTitle, formIngredients, formMethod);
});

loadLocal();
render();

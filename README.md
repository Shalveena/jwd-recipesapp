# jwd-recipesapp

# Yummy Bites, a recipes app

I originally made this app as part of the Junior Web Developer Bootcamp run by Generation Australia and Academy Xi. We were given the following requirements and were instructed to create this app in 72 hours.

## Requirements

1. Create a simple recipe app using JavaScript, HTML/CSS and any other libraries or frameworks.
2. You should be able to add recipes that have names and ingredients.
3. Show a list of all recipes.
4. Delete recipes.
5. Recipes should be saved in the browser's local storage.
6. The code should be readable, reusable and easy to modify.

## Version two

Originally, I used Bootstrap instead of CSS in the interest of saving some time on the design side of things, and because I wanted to focus my time on JavaScript so that I could practice my JS skills. I also used the form validation provided by Bootstrap as I did not have enough time and skills necessary to do the validation myself from scratch.

Since finishing the bootcamp, I realised that although I had learnt CSS, I had never put what I learnt about CSS into practice during the bootcamp itself. I was not confident in my ability to design anything using CSS, and felt it was not accurate to put "CSS" as a skill on my CV when I didn't feel confident about my ability on that front. I had also started a Udemy course on CSS and felt it would be good to practice what I was learning.

I had also been practicing my JavaScript skills by doing katas on codewars and had started a JavaScript course on Udemy to learn further. I felt this would be a great time to re-do the app, this time around using CSS instead of Bootstrap and doing the form validation myself.

## Challenges

It took me quite a long time, especially to get the design sideo of things done properly - but my oh my, did I learn a lot! It was a great learning experience and helped me solidify a lot of what I had learnt in terms of CSS.

The next challenge was doing the form validation. Validation is done through adding/removing particular classes from various DOM elements.

At the core of the validation process are two functions - checkRequired and checkLength. When the user clicks the button on the form to add a new recipe, first the checkRequired function is called, which checks whether the form's fields are empty or not. If the field is empty, the showError function is called, which adds a class to the DOM element and triggers some CSS styling into action such that the border becomes red and an error message appears. If the field is not empty, the showSuccess function is called, which triggers different CSS styling to indicate that the input is valid.

Then, the checkLength function is called, which checks the length of the input against the minimum value specified. Similar to the checkRequired function, this function also calls the showError function if the requirements are not met.

By re-doing the validation and improving the rest of the code in the JS file, I learnt so much and got an opportunity to really hone into the finer details. This has been an invaluable experience, and I am proud of the end result :)

## Future improvements

I would like to redo this app in the future using REACT. At the moment, the JavaScript file is quite big, which is not ideal. Some of the functions are als quite large and could be broken down into smaller components in future.

Another thing I'd like to explore is how to get the content in the text area to display on separate lines if that is how the user put it in. For example, if the user writes an ingredients list consisting of multiple lines, the card unfortunately displays it all on one line.

## Details

### Layout

The starting page of the app is simple - showing only the title and the Add New Recipe button.

The Add New Recipe button opens up a new modal. I chose to make the modal quite big because I did not want it to be squished, especially for mobile devices. This also allowed me to have larger input fields so that the user can easily fit the ingredients and method of the recipe into it. The modal includes a form that has three input fields (one input element, and two textarea elements), an add button and a reset button.

### Requirement: Must be able to add recipes

For this, I first made an empty array and then I wrote a function that creates a new object for the recipe and pushes that object into the array. That array would then hold all the recipes that are added.

### Requirement: Display the recipes

In order to render the recipes, I first created a function that includes the html for each recipe, saves it to a variable and returns that variable. I then created another function to render the html:

- The function first makes an empty array that will contain the html for all the recipes.
- It then creates the html for each recipe and pushes it to the array.
- It then changes the array into a string, where each element of the array starts on a new line, and then changes the inner html of the relevant html element.

### Requirement: Delete recipes

In order to be able to delete recipes, I first had to give the recipes unique IDs. To do this, I declared a global variable and set it to 0. Each new recipe then incremented the id variable by 1.

I created a function to delete recipes by using the .filter method. It creates a new array consisting of only the elements that **do not** have the id of the recipe that is being deleted. It then re-assigns the recipes array to this new array that consists of only the undeleted recipes.

The deleteRecipes function is called from inside the render function. I looped through all the delete buttons and for each delete button, I created an event listener, to listen for a click event. When the button is clicked, the event handler function calls the deleteRecipes function described above. It aso calls the render function and the function to update the local storage.

### Requirement: save to local storage

Finally, to store to local storage, I made a function that took the recipes array and changed it into a string, added it to local storage, and did the same for the Id.

Similarly, to load from local storage, I made a function that got the recipes from local storage, changed it back into an array and put it back into the recipes array. It did the same with the Id (parsing it into a number instead of an array though).

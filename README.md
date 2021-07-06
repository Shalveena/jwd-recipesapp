# jwd-recipesapp

# Yummy Bites, a recipes app

I made this app as part of the Junior Web Developer Bootcamp run by Generation Australia and Academy Xi. We were given the following requirements and were instructed to create this app in 72 hours.

## Requirements

1. Create a simple recipe app using JavaScript, HTML/CSS and any other libraries or frameworks.
2. You should be able to add recipes that have names and ingredients.
3. Show a list of all recipes.
4. Delete recipes.
5. Recipes should be saved in the browser's local storage.
6. The code should be readable, reusable and easy to modify.

## Technologies used

Due to the time constraint, I decided to use Bootstrap instead of CSS in order to save time on the design side of things. I wanted to focus my time more on JavaScript as I wanted more practice on that. I used vanilla JavaScript for this project as I have not yet learnt React.

## How I met the requirements

### Layout of the app

The starting page of the app is simple - showing only the title and the Add Recipe button.

    ![Landing page of the website](/images/landingpage.png)

The Add Recipe button opens up a new modal. I chose to make the modal extra long so that the user can easily fit the ingredients and method of the recipe into it. The modal includes a form that has three input fields, an add button and a reset button.

Because recipes could be quite long, I did not wanted to have a way to display only a part of each recipe, so that more recipes could be displayed on the page and less scrolling would be needed by the user. To achieve this, I added an accordion after the heading "Method", so that the title and ingredients of the recipe show by default but the method is hiden inside the accordion. When the user clicks "See more", the accordion is expanded to show the rest of the recipe.

    ![Closed accordion](images/accordion.png)

I chose to put the delete button just below the accordion, but make it visible right at the start (without requiring the user to click anything in order to show it). That way, the user can delete recipes with just one click.

### Validation

I used Bootstraps form validation to validate the form. At the moment, due to time constraints, the validation only checks whether the fields are emtpy or not. In future, I would like to add validation to check for minimum length.

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

In order to call the delete recipes function, I first had to target the right delete button and listen for the click event on it. I found this part very difficult because I did not know how to target one particular delete button amongst many. I decided to select all the delete buttons and then make an event listener for each
delete button. Then, I determined which button had been clicked by using event.target. I then checked the id of the corresponding recipe and then fed that into the delete recipe function as the argument. I then needed to call the render function again to render the new recipes and to create new event handlers for the delete buttons.

I found out that the above had to be put into the render function otherwise it did not work. This is because each time the render method was called, it changed the innerHTML of the displayed recipes and there were no event handlers on the delete buttons anymore!

### Requirement: save to local storage

Finally, to store to local storage, I made a function that took the recipes array and changed it into a string, added it to local storage, and did the same for the Id. I called the save method after the add recipe method.

Similarly, to load from local storage, I made a function that got the recipes from local storage, changed it back into an array and put it back into the recipes array. It did the same with the Id (parsing it into a number instead of an array though).
I called the load method before the render method.

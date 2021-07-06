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

    ![Landing page of the website (images/landingpage)]

The Add Recipe button opens up a new modal. I chose to make the modal extra long so that the user can easily fit the ingredients and method of the recipe into it. The modal includes a form that has three input fields, an add button and a reset button.

Because recipes could be quite long, I did not wanted to have a way to display only a part of each recipe, so that more recipes could be displayed on the page and less scrolling would be needed by the user. To achieve this, I added an accordion after the heading "Method", so that the title and ingredients of the recipe show by default but the method is hiden inside the accordion. When the user clicks "See more", the accordion is expanded to show the rest of the recipe.

    ![Closed accordion (images/accordion)]

I chose to put the delete button just below the accordion, but make it visible right at the start (without requiring the user to click anything in order to show it). That way, the user can delete recipes with just one click.

### Requirement: Must be able to add recipes

For this, I first made an empty array and then I wrote a function that creates a new object for the recipe and pushes that object into the array. That array would then hold all the recipes that are added.

### Requirement: Display the recipes

In order

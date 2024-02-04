//code runs immediately

let RecipeArray = [];

let RecipeObject = function (pCategory, pName, pTime, pIngredients, pInstructions) {
    this.category = pCategory;
    this.name = pName;
    this.time = pTime;
    this.ingredients = pIngredients;
    this.instructions = pInstructions;
}

RecipeArray.push ( new RecipeObject("Breakfast", "Cereal", "3 min", "Cereal and Milk", "Pour cereal into a bowl followed by milk")  );
RecipeArray.push ( new RecipeObject("Lunch", "Rice w/ egg", "10 min", "Rice, Egg(s), Soy Sauce", "Cook rice, fry egg(s), pour soy sauce on top",)  );
RecipeArray.push ( new RecipeObject("Breakfast", "PB&J", "5 min", "Bread, Peanut Butter, Jelly", "Spread peanut butter on one side of both pieces of bread, spread jelly on top of the peanut butter, put the bread together w pb&j facing inwards")  );

//==========================================================================
// runs  when dom is loaded

$(document).on("pageinit", "#add-recipe", function() {
    createList();

    $("#buttonAdd").on("click", function() {
        const category = $("#recipe-category").val();
        const name = $("#recipe-name").val();
        const time = $("#recipe-time").val();
        const ingredients = $("#recipe-ingredients").val();
        const instructions = $("#recipe-instructions").val();

        if (name && time && ingredients && instructions) {
            RecipeArray.push(new RecipeObject(category, name, time, ingredients, instructions));

            $("#recipe-category, #recipe-name, #recipe-time, #recipe-ingredients, #recipe-instructions").val("");
            createList();
        } else {
            alert("Please fill in all fields before adding a recipe.");
        }
    });
});

$(document).on("pageinit", "#view-recipes", function() {
    displayRecipes();
});

//==========================================================================
// function defintions

function createList() {
    
    var myul = document.getElementById("recipe-list");
    myul.innerHTML = "";

    RecipeArray.forEach(function (element,) {  
        var li = document.createElement('li');
          
        li.innerHTML = "<b>" + element.name + " [" + element.category + "] (" + element.time + ") </b><br> Ingredients: " + element.ingredients + " <br> Instructions: " + element.instructions;
        myul.appendChild(li);
    });
};

function displayRecipes() {

    var myul = document.getElementById("recipe-list");
    myul.innerHTML = "";

    RecipeArray.forEach(function(element) {
        var li = document.createElement('li');

        li.innerHTML = "<b>" + element.name + " [" + element.category + "] (" + element.time + ") </b><br> <i>Ingredients:</i> " + element.ingredients + " <br> <i>Instructions:</i> " + element.instructions;
        myul.appendChild(li);
    });
}
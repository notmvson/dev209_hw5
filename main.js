let RecipeArray = [];

let RecipeObject = function(pCategory, pName, pTime, pIngredients, pInstructions) {
    this.category = pCategory;
    this.name = pName;
    this.time = pTime;
    this.ingredients = pIngredients;
    this.instructions = pInstructions;
}

RecipeArray.push(new RecipeObject("Breakfast", "Cereal", "3 min", "Cereal and Milk", "Pour cereal into a bowl followed by milk"));
RecipeArray.push(new RecipeObject("Lunch", "Rice w/ egg", "10 min", "Rice, Egg(s), Soy Sauce", "Cook rice, fry egg(s), pour soy sauce on top"));
RecipeArray.push(new RecipeObject("Breakfast", "PB&J", "5 min", "Bread, Peanut Butter, Jelly", "Spread peanut butter on one side of both pieces of bread, spread jelly on top of the peanut butter, put the bread together w pb&j facing inwards"));

$(document).on("pagebeforeshow", "#add-recipe", function() {
    createList();

    $("#buttonAdd").on("click", function() {
        const category = $("#recipe-category").val();
        const name = $("#recipe-name").val();
        const time = $("#recipe-time").val();
        const ingredients = $("#recipe-ingredients").val();
        const instructions = $("#recipe-instructions").val();

        if (category && name && time && ingredients && instructions) {
            RecipeArray.push(new RecipeObject(category, name, time, ingredients, instructions));

            $("#recipe-category, #recipe-name, #recipe-time, #recipe-ingredients, #recipe-instructions").val("");
            createList();
        } else {
            alert("Please fill in all fields before adding a recipe.");
        }
    });
});

$(document).on("pagebeforeshow", "#view-recipes", function() {
    createList(); // Update the recipe list on pageinit

    // Handle click events on recipe list items
    $("#recipe-list").on("click", "li", function() {
        var index = $(this).index();
        var recipe = RecipeArray[index];

        // Perform a unique action for each recipe
        switch (recipe.name) {
            case "Cereal":
                window.open("https://www.wikihow.com/Eat-a-Bowl-of-Cereal", "_blank");
                break;
            case "Rice w/ egg":
                window.open("https://christieathome.com/blog/gyeran-bap-korean-egg-rice/", "_blank");
                break;
            case "PB&J":
                window.open("https://www.wikihow.com/Make-a-Peanut-Butter-and-Jelly-Sandwich", "_blank");
                break;
            default:
                // Handle default action or leave empty
                break;
        }
    });
});

function createList() {
    var myul = $("#recipe-list");
    myul.empty();

    RecipeArray.forEach(function(element, index) {
        var li = $("<li>").html("<b>" + element.name + " [" + element.category + "] (" + element.time + ") </b><br> <i>Ingredients:</i> " + element.ingredients + " <br> <i>Instructions:</i> " + element.instructions);
        var deleteButton = $("<button>").text("Delete").addClass("delete-button").data("index", index);
        li.append(deleteButton);
        myul.append(li);
    });

    //delete buttons
    $(".delete-button").on("click", function() {
        var indexToRemove = $(this).data("index");
        RecipeArray.splice(indexToRemove, 1); // Remove the recipe at the specified index
        createList();
    });
}

let RecipeArray = [];

let RecipeObject = function(pID, pCategory, pName, pTime, pIngredients, pInstructions) {
    this.ID = pID;
    this.ID = RecipeArray.length + 1;
    this.category = pCategory;
    this.name = pName;
    this.time = pTime;
    this.ingredients = pIngredients;
    this.instructions = pInstructions;
}

RecipeArray.push(new RecipeObject(1, "Breakfast", "Cereal", "3 min", "Cereal and Milk", "Pour cereal into a bowl followed by milk"));
RecipeArray.push(new RecipeObject(2, "Lunch", "Rice w/ egg", "10 min", "Rice, Egg(s), Soy Sauce", "Cook rice, fry egg(s), pour soy sauce on top"));
RecipeArray.push(new RecipeObject(3, "Breakfast", "PB&J", "5 min", "Bread, Peanut Butter, Jelly", "Spread peanut butter on one side of both pieces of bread, spread jelly on top of the peanut butter, put the bread together w pb&j facing inwards"));

$(document).on("pagebeforeshow", "#view-recipes", function() {
    createList(); // Update the recipe list on pageinit
});

$(document).on("pagebeforeshow", "#add-recipe", function() {

    $("#buttonAdd").on("click", function() {
        const ID = RecipeArray.length;
        const category = $("#recipe-category").val();
        const name = $("#recipe-name").val();
        const time = $("#recipe-time").val();
        const ingredients = $("#recipe-ingredients").val();
        const instructions = $("#recipe-instructions").val();

        if (category && name && time && ingredients && instructions) {
            RecipeArray.push(new RecipeObject(ID, category, name, time, ingredients, instructions));
            document.location.href = "index.html#view-recipes"
            $("#recipe-category, #recipe-name, #recipe-time, #recipe-ingredients, #recipe-instructions").val("");
            createList();
        } else {
            alert("Please fill in all fields before adding a recipe.");
        }
    });
});

$(document).on("pagebeforeshow", "#details", function(event) {
    let localID = localStorage.getItem("parm");
    RecipeArray = JSON.parse(localStorage.getItem("RecipeArray"));
    console.log(RecipeArray[localID - 1]);

    document.getElementById("oneName").innerHTML = "Recipe Name: " + RecipeArray[localID - 1].name;
    document.getElementById("oneCategory").innerHTML = "Category: " + RecipeArray[localID - 1].category;
    document.getElementById("oneTime").innerHTML = "Cook Time: " + RecipeArray[localID - 1].time;
    document.getElementById("oneIngredients").innerHTML = "Ingredients: " + RecipeArray[localID - 1].ingredients;
    document.getElementById("oneInstructions").innerHTML = "Instructions: " + RecipeArray[localID - 1].instructions;
})

function createList() {
    var myul = $("#recipe-list");
    myul.empty();

    RecipeArray.forEach(function(element, index) {
        var li = $("<li>").html("<b>" + element.name + " [" + element.category + "] (" + element.time + ") </b><br> <i>Ingredients:</i> " + element.ingredients);
        li.addClass("oneRecipe");
        li.attr("data-parm", element.ID);
        var deleteButton = $("<button>").text("Delete").addClass("delete-button").data("index", index);
        li.append(deleteButton);
        myul.append(li);
    });

    var liList = document.getElementsByClassName("oneRecipe");
    let newRecipeArray = Array.from(liList);

    newRecipeArray.forEach(function(element) {
        element.addEventListener ("click", function() {
            var parm = this.getAttribute("data-parm");
            localStorage.setItem("parm", parm);

            let stringRecipeArray = JSON.stringify(RecipeArray);
            localStorage.setItem("RecipeArray", stringRecipeArray);

            document.location.href = "index.html#details";

        })
    })

    $(".delete-button").on("click", function() { //delete buttons
        var indexToRemove = $(this).data("index");
        RecipeArray.splice(indexToRemove, 1); // Remove the recipe at the specified index
        createList();
    });
}

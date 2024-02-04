let RecipeArray = [];

let RecipeObject = function (pCategory, pName, pTime, pIngredients, pInstructions) {
    this.category = pCategory;
    this.name = pName;
    this.time = pTime;
    this.ingredients = pIngredients;
    this.instructions = pInstructions;
}

RecipeArray.push ( new RecipeObject("Breakfast", "Cereal", "3 min", "Cereal and Milk", "Pour cereal into bow then pour milk into bowl")  );
RecipeArray.push ( new RecipeObject("Lunch", "Rice w/ egg", "10 min", "Rice, egg, soy sauce", "Cook rice, fry egg(s), pour soy sauce on top",)  );
RecipeArray.push ( new RecipeObject("Breakfast", "PB&J", "5 min", "Bread, Peanut Butter, Jelly", "Spread peanut butter on one side of both pieces of bread, spread jelly on top of the peanut butter, put the bread together w pb&j facing inwaards")  );

let selectedType = "";

// code runs immediately
//================================================================

// runs  when dom is loaded
$(document).on("pagecreate", function() {
    createList();

    $("#buttonAdd").on("click", function() {
        const name = $("#recipe-name").val();
        const time = $("#recipe-time").val();
        const ingredients = $("#recipe-ingredients").val();
        const instructions = $("#recipe-instructions").val();

        if (name && time && ingredients && instructions) {
            RecipeArray.push(new RecipeObject(selectedType, name, time, ingredients, instructions));

            $("#recipe-name, #recipe-time, #recipe-ingredients, #recipe-instructions").val("");
            createList();
        } else {
            alert("Please fill in all fields before adding a recipe.");
        }
    });

    $(document).bind("change", "#recipe-category", function (event, ui) {
        selectedType = $("#recipe-category").val();
    });
})



//======================================
// function defintions
function createList() {
    // clear prior data
    var myul = document.getElementById("recipe-list");
    myul.innerHTML = "";

    RecipeArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
          // added data-role="listview" to the ul in the html
        li.innerHTML = element.category + " - " + element.name + " (" + element.time + "): " + element.ingredients + " " + element.instructions;
        myul.appendChild(li);
    });
};
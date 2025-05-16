const InputRecipeName = document.getElementById("recipe-name");
const InputRecipeId = document.getElementById("recipe-id");
const InputRecipeDescription = document.getElementById("recipe-description");
const InputCourseName = document.getElementById("course-name");
const ingredientList = document.getElementById("ingredient-list");
var ListOfIngredients = [];

const addIngredientBtn = document.getElementById("addIngredientBtn");
const InputInstructions = document.getElementById("instructions");
const SaveRecipe = document.querySelector('.save');

const ListOfImages = [];
const addPhotoBtn = document.querySelector('.add-photo-button');
const imageInput = document.getElementById('imageUpload');
const mainImage = document.getElementById('main-image');
const deleteMainBtn = document.getElementById('delete-main-image');

addIngredientBtn.addEventListener("click", () => {
    const newIngredient = document.createElement("div");
    newIngredient.classList.add("ingredient-item");
    newIngredient.innerHTML = `
    <input type="text" class="ingredient-id" name="ingredient-id[]" placeholder="ID" required/>
    <input type="text" class="ingredient-name" name="ingredient-name[]" placeholder="Name" required/>
    <input type="text" class="ingredient-quantity" name="ingredient-quantity[]" placeholder="Quantity" required/>
    <button type="button" class="remove-ingredient">✕</button>
    `;
    ingredientList.insertBefore(newIngredient, addIngredientBtn);
});

ingredientList.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-ingredient")) {
        e.target.parentElement.remove();
    }
});

addPhotoBtn.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            mainImage.src = e.target.result;
            mainImage.style.display = "block";
            deleteMainBtn.style.display = "block";
            document.querySelector(".main-image-container").style.visibility = "visible";

            let newThumb = document.createElement('div');
            newThumb.classList.add('thumbnail-item');
            newThumb.innerHTML = `
            <div style="position: relative;">
                <img class="thumbnail-img" src="${e.target.result}" alt="Recipe thumbnail" style="width: 100%; height: 100px; object-fit: contain;"/>
            </div>`;
            document.querySelector('.thumbnail-gallery').insertBefore(newThumb, addPhotoBtn);
            ListOfImages.push(newThumb);
        };
        reader.readAsDataURL(file);
    }
});

deleteMainBtn.addEventListener('click', () => {
    mainImage.src = "";
    mainImage.style.display = "none";
    deleteMainBtn.style.display = "none";
    imageInput.value = ""; 
    document.querySelector('.thumbnail-gallery').removeChild(ListOfImages[ListOfImages.length - 1]);
    if (ListOfImages.length > 1) {
        ListOfImages.pop();
        mainImage.src = ListOfImages[ListOfImages.length - 1].querySelector('.thumbnail-img').src;
        mainImage.style.display = "block";
        deleteMainBtn.style.display = "block";
    } else {
        ListOfImages.pop();
        document.querySelector(".main-image-container").style.visibility = "hidden";
    }
});

SaveRecipe.addEventListener('click', function (e) {
    e.preventDefault();
    ListOfIngredients = [];

    const ingredientItems = document.querySelectorAll('.ingredient-item');
    ingredientItems.forEach(item => {
        const id = item.querySelector('.ingredient-id')?.value.trim();
        const name = item.querySelector('.ingredient-name')?.value.trim();
        const quantity = item.querySelector('.ingredient-quantity')?.value.trim();

        if (id && name && quantity) {
            ListOfIngredients.push(`${quantity} ${name}`); 
        }
    });

    if (
        InputRecipeName.value.trim() === "" ||
        InputRecipeId.value.trim() === "" ||
        InputRecipeDescription.value.trim() === "" ||
        InputCourseName.value.trim() === "" ||
        InputInstructions.value.trim() === "" ||
        ListOfIngredients.length === 0 ||
        imageInput.files.length === 0
    ) {
        alert("Please fill all the fields and upload an image.");
        return;
    }

    const recipe = {
        id: InputRecipeId.value.trim(),
        name: InputRecipeName.value.trim(),
        description: InputRecipeDescription.value.trim(),
        ingredients: ListOfIngredients,
        course_name: InputCourseName.value.trim(),
        instructions: InputInstructions.value.trim(),
        is_favourite: false
    };

    const imageFile = imageInput.files[0];
    SendRecipeToAPIWithImage(recipe, imageFile);
});

async function SendRecipeToAPIWithImage(recipeData, imageFile) {
    try {
        const formData = new FormData();
        formData.append("id", recipeData.id);
        formData.append("name", recipeData.name);
        formData.append("description", recipeData.description);
        formData.append("course_name", recipeData.course_name);
        formData.append("instructions", recipeData.instructions);
        formData.append("is_favourite", recipeData.is_favourite);
        formData.append("ingredients", JSON.stringify(recipeData.ingredients));
        formData.append("image", imageFile); 

        const response = await fetch("https://omarsaberawad.pythonanywhere.com/recipes/", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const errData = await response.text();
            console.error("Failed to send recipe:", errData);
            alert("Error sending recipe: " + errData);
            return;
        }

        alert("Recipe submitted successfully!");
        window.location.href = "../RecipeList/RecipeList.html";
    } catch (error) {
        console.error("Network error:", error);
        alert("Network error: " + error.message);
    }
}

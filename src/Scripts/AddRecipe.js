const InputRecipeName = document.getElementById("recipe-name");

const InputRecipeId = document.getElementById("recipe-id");

const InputRecipeDescription = document.getElementById("recipe-description");

const InputCourseName = document.getElementById("course-name");

const ingredientList = document.getElementById("ingredient-list");

var ListOfIngredients = [];

const addIngredientBtn = document.getElementById("addIngredientBtn");

const InputInstructions = document.getElementById("instructions");

const SaveRecipe = document.querySelector('.save');

let ListOfRecipes = JSON.parse(localStorage.getItem("ListOfRecipes")) ? JSON.parse(localStorage.getItem("ListOfRecipes")) : [];

const ListOfImages = [];

const addPhotoBtn = document.querySelector('.add-photo-button');
const imageInput = document.getElementById('imageUpload');
const mainImage = document.getElementById('main-image');
const deleteMainBtn = document.getElementById('delete-main-image');
const deletethumbnailBtns = document.querySelectorAll('.delete-thumbnail');

const data = JSON.parse(localStorage.getItem("ListOfRecipes")) ? JSON.parse(localStorage.getItem("ListOfRecipes")) : [];


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
function AddRecipe() {
    let recipe = {
        name: document.getElementById("recipe-name").value,
        id: document.getElementById("recipe-id").value,
        image: ListOfImages.at(0).querySelector('.thumbnail-img').src,
        description: document.getElementById("recipe-description").value,
        course: document.getElementById("course-name").value,
        ListOfIngredients: [...ListOfIngredients],
        instructions: document.getElementById("instructions").value,
    };
    ListOfRecipes.push(recipe);
    localStorage.setItem("ListOfRecipes", JSON.stringify(ListOfRecipes));
    ListOfIngredients = [];
}


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
    console.log(ListOfImages.length);
});


deleteMainBtn.addEventListener('click', () => {
    mainImage.src = "";
    mainImage.style.display = "none";
    deleteMainBtn.style.display = "none";
    imageInput.value = ""; 
    document.querySelector('.thumbnail-gallery').removeChild(ListOfImages[ListOfImages.length - 1]);
    if(ListOfImages.length > 1) {
        ListOfImages.pop();
        mainImage.src = ListOfImages[ListOfImages.length - 1].querySelector('.thumbnail-img').src;
        mainImage.style.display = "block";
        deleteMainBtn.style.display = "block";
    }
    else{
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
            ListOfIngredients.push({ ID: id, Name: name, Quantity: quantity });
        }
    });

    if (
        InputRecipeName.value.trim() === "" ||
        InputRecipeId.value.trim() === "" ||
        InputRecipeDescription.value.trim() === "" ||
        InputCourseName.value.trim() === "" ||
        InputInstructions.value.trim() === "" ||
        ListOfIngredients.length === 0 ||
        ListOfImages.length === 0
    ) {
        alert("Please fill all the fields");
        return;
    }

    AddRecipe();

    window.location.href = "../RecipeList/RecipeList.html";
});








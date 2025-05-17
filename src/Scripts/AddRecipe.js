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

const urlParams = new URLSearchParams(window.location.search);
const isEditMode = urlParams.get('edit') === 'true';
const recipeId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', async function() {
    if (isEditMode && recipeId) {
        await loadRecipeForEditing(recipeId);
        document.querySelector('.form-title').textContent = 'Edit Recipe';
        SaveRecipe.textContent = 'Update Recipe';
    }
});

async function loadRecipeForEditing(id) {
    try {
        const response = await fetch(`https://omarsaberawad.pythonanywhere.com/recipes/${id}/`);
        if (!response.ok) throw new Error('Failed to fetch recipe');
        
        const recipeData = await response.json();
        
        InputRecipeName.value = recipeData.name;
        InputRecipeId.value = recipeData.id;
        InputRecipeDescription.value = recipeData.description;
        InputCourseName.value = recipeData.course_name;
        InputInstructions.value = recipeData.instructions;
        
        if (recipeData.ingredients && Array.isArray(recipeData.ingredients)) {
            recipeData.ingredients.forEach(ingredient => {
                addIngredientField(ingredient);
            });
        }
        
        if (recipeData.image) {
            mainImage.src = recipeData.image;
            mainImage.style.display = "block";
            deleteMainBtn.style.display = "block";
            document.querySelector(".main-image-container").style.visibility = "visible";
            
            let newThumb = document.createElement('div');
            newThumb.classList.add('thumbnail-item');
            newThumb.innerHTML = `
            <div style="position: relative;">
                <img class="thumbnail-img" src="${recipeData.image}" alt="Recipe thumbnail" style="width: 100%; height: 100px; object-fit: contain;"/>
            </div>`;
            document.querySelector('.thumbnail-gallery').insertBefore(newThumb, addPhotoBtn);
            ListOfImages.push(newThumb);
        }
        
    } catch (error) {
        console.error('Error loading recipe:', error);
        alert('Failed to load recipe for editing');
    }
}

function addIngredientField(ingredientText) {
    const newIngredient = document.createElement("div");
    newIngredient.classList.add("ingredient-item");
    
    const parts = ingredientText.split(' ');
    const quantity = parts.shift();
    const name = parts.join(' ');
    
    newIngredient.innerHTML = `
    <input type="text" class="ingredient-name" name="ingredient-name[]" placeholder="Name" value="${name}" required/>
    <input type="text" class="ingredient-quantity" name="ingredient-quantity[]" placeholder="Quantity" value="${quantity}" required/>
    <button type="button" class="remove-ingredient">✕</button>
    `;
    ingredientList.insertBefore(newIngredient, addIngredientBtn);
}

addIngredientBtn.addEventListener("click", () => {
    addIngredientField('');
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

SaveRecipe.addEventListener('click', async function (e) {
    e.preventDefault();
    ListOfIngredients = [];

    const ingredientItems = document.querySelectorAll('.ingredient-item');
    ingredientItems.forEach(item => {
        const name = item.querySelector('.ingredient-name')?.value.trim();
        const quantity = item.querySelector('.ingredient-quantity')?.value.trim();

        if (name && quantity) {
            ListOfIngredients.push(`${quantity} ${name}`); 
        }
    });

    const requiredFieldsValid = (
        InputRecipeName.value.trim() !== "" &&
        InputRecipeId.value.trim() !== "" &&
        InputRecipeId.value > 0  &&
        InputRecipeDescription.value.trim() !== "" &&
        InputCourseName.value.trim() !== "" &&
        InputInstructions.value.trim() !== "" &&
        ListOfIngredients.length > 0
    );

    if (!requiredFieldsValid) {
        alert("Please fill all required fields.");
        return;
    }

    if (!isEditMode && imageInput.files.length === 0) {
        alert("Please upload an image for the recipe.");
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
    
    if (isEditMode) {
        await updateRecipe(recipe, imageFile);
    } else {
        await createRecipe(recipe, imageFile);
    }
});

async function createRecipe(recipeData, imageFile) {
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
            const errData = await response.json();
            throw new Error(errData.message || 'Failed to create recipe');
        }

        alert("Recipe created successfully!");
        window.location.href = "../RecipeList/RecipeList.html";
    } catch (error) {
        console.error("Error creating recipe:", error);
        alert("Error: " + error.message);
    }
}

async function updateRecipe(recipeData, imageFile) {
    try {
        const formData = new FormData();
        formData.append("name", recipeData.name);
        formData.append("description", recipeData.description);
        formData.append("course_name", recipeData.course_name);
        formData.append("instructions", recipeData.instructions);
        formData.append("ingredients", JSON.stringify(recipeData.ingredients));
        formData.append("is_favourite", recipeData.is_favourite);
        
        if (imageFile) {
            formData.append("image", imageFile);
        }

        const response = await fetch(`https://omarsaberawad.pythonanywhere.com/recipes/${recipeData.id}/`, {
            method: "PATCH",
            body: formData
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || JSON.stringify(errData) || 'Failed to update recipe');
        }

        alert("Recipe updated successfully!");
        window.location.href = "../RecipeList/RecipeList.html";
    } catch (error) {
        console.error("Error updating recipe:", error);
        alert("Error: " + error.message);
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
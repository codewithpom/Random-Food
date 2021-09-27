
$(function () {

    const button = $('.btn');
    const receipeContainer = $('#receipe');

    button.on('click', function () {
        // receipeContainer.text('test');
        $("#receipe").html('<div class="spinner-border" role="status">\n<span class= "sr-only" > Loading...</span>\n</div> ')
        $.ajax({
            url: "https://www.themealdb.com/api/json/v1/1/random.php",
            method: "GET",
            dataType: "json",
        }).done((res) => {
            // console.log(JSON.stringify(res));
            createMeal(res.meals[0]);
            $('#hello').html("");
            $("#statement").html("Did not like the food below.");
        })

    })

    function createMeal(res) {

        const ingredients = [];

        // Get all ingredients from the object. Up to 20
        for (let i = 1; i <= 20; i++) {
            if (res[`strIngredient${i}`]) {
                ingredients.push(
                    `${res[`strIngredient${i}`]} - ${res[`strMeasure${i}`]}`
                );
            } else {
                break;
            }
        }

        receipeContainer.html(`
                            <div class="row border mb-4">             
                            
                                <div class="col-lg-6">
                                    <div class="row">

                                        <div class="col-lg-12 my-4 ">
                                            <img class="w-100 mealThumb" src="${res.strMealThumb}" alt="">
                                        </div>
                                
                                        <div class="col-lg-8">
                                            <h3 class="mt-2">Ingrediens:</h3>
                                            <ul class="list-group list-group-flush">
                                                ${ingredients.map(ingredient => `<li class="text-lg-left list-item ml-3">${ingredient}</li>`).join('')}
                                            </ul>
                                        </div>

                                        <div class="col-lg-4 ">
                                            <h3 class="text-center mt-2">Category:</h3>
                                            <p>${res.strCategory}</p>

                                            <h3 class="text-center">Area:</h3>
                                            <p> ${res.strArea}</p>

                                            ${res.strTags === null ? '' : `<h3 class="text-center">Tags:</h3>
                                            <p>${res.strTags.split(',').join(', ')}</p>`}
                                        </div>  

                                    </div>
                                </div>

                                <div class="col-lg-6">
                            
                                    <h3 class="h1 mt-3">${res.strMeal}</h3>
                            
                                    <div class="col-lg-12 pt-3">
                                        <p class="text-justify">${res.strInstructions}</p>
                                    </div>
                            
                                    <iframe class="my-3" width="100%" height="315"
                                    src="https://www.youtube.com/embed/${res.strYoutube.slice(-11)}"
                                    frameborder="0">
                                    </iframe>
                                    
                                </div>

                            </div>
            `);
    };

});




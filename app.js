function onLoad(searchValue){
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
  fetch(url)
  .then(rest => rest.json())
  .then(rest => displayMeal(rest))
}


function displayMeal(res){
  
  console.log(res);
  const meal_container = document.getElementById('meal-container');
  
  for(const api of res.meals){
    console.log(api);
    const div = document.createElement('div');
    
    div.innerHTML = `
    <div class="col">
        <div onclick="displayMealDetails(${api.idMeal})" class="card">
          <img src="${api.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${api.strMeal}</h5>
            <p class="card-text">${api.strInstructions.slice(0,100)}</p>
            </div>
        </div>
    </div>
    `;
    
    meal_container.appendChild(div);
  }
  
}


function sendData(){
  const input_flied_Tag = document.getElementById('input_flied');
  const input_flied_string = input_flied_Tag.value;

  onLoad(input_flied_string);
 

}

function displayMealDetails(idMeal){
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
  .then(res => res.json())
  .then(res => loadOtherData(res))
}

function loadOtherData(res){
  const meal_details = document.getElementById('meal_details');
  meal_details.innerHTML = ` `; 
  for(const other of res.meals){
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="col">
        <div onclick="displayMealDetails(${other.idMeal})" class="card">
          <img src="${other.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${other.strMeal}</h5>
            <p class="card-text">${other.strInstructions.slice(0,100)}</p>
            </div>
        </div>
    </div>
    `;

    meal_details.appendChild(div);
  }
  
}




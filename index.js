let section = document.querySelector("section");
let btn = document.querySelector("button");

let recipe = document.querySelector("p");

let list = document.getElementById("items");

getData(); // don't leave blank-screen initially

btn.addEventListener("click", getData);


//getting from API
async function getData() {
  try {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    if (!response.ok) {
      throw new Error(`Something went wrong ${response.status}`);
    } else {
      let convert_json = await response.json();
      let data = convert_json.meals[0];

          let img = document.getElementById("image");
          img.src = data.strMealThumb;
          img.alt = data.strMeal;

          let dish_name = document.querySelector("h2");
          dish_name.innerHTML = `Name : ${data.strMeal}`;
      
      Body_color();
      
      GetContent(data);
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}

//getting and setting up the content for Recipe
function GetContent(data) {
  console.log(data.strMeal);
  console.log(data.strInstructions);
  console.log(`${data.strIngredient2} --- ${data.strMeasure4}`);
  recipe.textContent = `${data.strInstructions}`;

  let all_ingredients = [];

    for (let i = 0; i <= 20; i++) {
      if (data["strIngredient" + i] && data["strMeasure" + i]) {
        all_ingredients.push(`${data["strIngredient" + i]} --- ${data["strMeasure" + i]}`);
      }
    }

    list.innerHTML = `
      <ul>
        ${all_ingredients.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
}

  //random color for background
  function random(clr){
    return Math.floor(Math.random()*clr);
  }

  function Body_color(){
    let rand = `rgb(${random(10)} ${random(40)} ${random(100)})`;
    document.body.style.backgroundColor = rand;
  };

// let div = document.getElementById("contain");
// let btn = document.querySelector("button");
// btn.addEventListener("click", Randommeal);

// async function Randommeal(){
//   let imgs = document.getElementByTagName("img");
//   let raw_response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
//   let json_data = await raw_response.json();
//   let data = json_data.meals[0];
//   imgs.src = data.strMealThumb;
//   imgs.alt = data.strMeal;
//   console.log(imgs.src);
// }

/* THIS IS GOOD WAY FOR HANDLING ERRORS
    try {
      const raw_response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!raw_response.ok) { // check for the 404 errors
            throw new Error(raw_response.status);
        }
      const json_data = await raw_response.json();
      let data = json_data.meals[0];

      img.src = data.strMealThumb;
      img.alt = data.strMeal;

      let dish_name = document.querySelector("h3");
      dish_name.innerHTML = `Name : ${data.strMeal}`;

      Body_color();
    }
    catch (error) { // catch block for network errors
        console.log(error); 
    }
 */
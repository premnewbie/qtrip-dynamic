import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities\

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  try {
    const cities = await fetch(config.backendEndpoint+"/cities");
    const data =  await cities.json();
    return data;
  } catch(err){
    return null;
  }
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  const container = document.getElementById('data');
  let divTile = document.createElement('div');
  divTile.setAttribute('class','col-6 col-md-3');

  let anchor = document.createElement('a');
  anchor.setAttribute('href',`pages/adventures/?city=${id}`);
  anchor.setAttribute('id',`${id}`)
  anchor.setAttribute('class','tile')


  const img = document.createElement('img');
  img.setAttribute('class','img-responsive');
  img.setAttribute('src',`${image}`);

  const textDiv = document.createElement('div');
  textDiv.setAttribute('class','tile-text');

  const h5 = document.createElement('h5');
  h5.innerText = `${city}`;

  const para = document.createElement('p');
  para.innerText = `${description}`;

  textDiv.append(h5);
  textDiv.append(para);

  anchor.append(img);
  anchor.append(textDiv);

  divTile.append(anchor);

  container.append(divTile);

  return container;
}



  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM



export { init, fetchCities, addCityToDOM };

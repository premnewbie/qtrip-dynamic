
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(search);
  const cityName = params.get('city');

  return cityName;
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try{
    const response = await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    const result = await response.json();

    return result;
  } catch(err){
      return null;
  }
  
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  const data = document.getElementById("data");
  data.innerHTML = '';
  adventures.forEach((card)=>{
    let id = card.id;
    let name = card.name;
    let image = card.image;
    let category = card.category;
    let costPerHead = card.costPerHead;
    let duration = card.duration;

    const anchor = document.createElement('a');
    anchor.setAttribute('href',`./detail/?adventure=${id}`)
    anchor.setAttribute('class',`col-6 col-md-3`);
    anchor.setAttribute('id',`${id}`);

    const activityDiv = document.createElement('div');
    activityDiv.setAttribute('class','activity-card')

    const img = document.createElement('img');
    img.setAttribute('src',`${image}`); 

    const categoryBanner = document.createElement('div');
    categoryBanner.setAttribute('class','category-banner');
    categoryBanner.innerHTML= category;

    const cardFooter = document.createElement('div');
    cardFooter.setAttribute('class','d-flex flex-column justify-content-between w-100');

    const firstFooter = document.createElement('div');
    firstFooter.setAttribute('class','d-flex  justify-content-between')

    const cardName = document.createElement('p');
    cardName.innerText = name;

    const cost = document.createElement('p');
    cost.innerText = `₹${costPerHead}`;

    firstFooter.appendChild(cardName);
    
    firstFooter.appendChild(cost);

    cardFooter.appendChild(firstFooter);

    const secondFooter = document.createElement('div');
    secondFooter.setAttribute('class','d-flex justify-content-between')

    const durText = document.createElement('p');
    durText.innerText = 'Duration';

    const dur = document.createElement('p');
    dur.innerText = `${duration} Hours`;

    secondFooter.appendChild(durText);

    secondFooter.appendChild(dur);

    cardFooter.appendChild(secondFooter);
  
    activityDiv.appendChild(categoryBanner);

    activityDiv.appendChild(img);

    activityDiv.appendChild(cardFooter);

    anchor.appendChild(activityDiv);

    data.appendChild(anchor);

    return data;
  })
  
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
/*   console.log(list, 'list') */
  const filterList = list.filter(item => item.duration > low && item.duration <= high);
  return filterList; 
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
 const filterList = list.filter(item => categoryList.includes(item.category));
 return filterList
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {

  let filterValue = '';

  if(filters["duration"].length && filters["category"].length){
    const duration = filters["duration"];
    const durSplit = duration.split("-");
    const low = durSplit[0];
    const high = durSplit[1];

    const durFilter = filterByDuration(list,low,high);
    const finalFilter = filterByCategory(durFilter,filters["category"]);
    filterValue = finalFilter;
  } else if(filters["duration"].length){
    const duration = filters["duration"];
    const durSplit = duration.split("-");
    const low = durSplit[0];
    const high = durSplit[1];

    const durFilter = filterByDuration(list,low,high);
    filterValue = durFilter;
  } else if(filters["category"].length){
    const finalFilter = filterByCategory(list,filters["category"]);
    filterValue = finalFilter;
  } else {
    filterValue = list;
  }

  return filterValue;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  localStorage.setItem("filters",JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  const localFilters = localStorage.getItem("filters");
  return JSON.parse(localFilters);
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  const categoryElementList = document.getElementById("category-list");
  const categories = filters["category"];

   categories.forEach(categorie => {
    const newElement = document.createElement("div");
    newElement.className= "category-filter";
    newElement.innerText = categorie;
    
    categoryElementList.appendChild(newElement);
  })
} 
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

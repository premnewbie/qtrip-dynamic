import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  try{
    const urlParam = new URLSearchParams(search);
    return urlParam.get('adventure');
  } 
  catch(err){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const url = config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  catch(err){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const {name,subtitle,content,images} = adventure;

  const adventureName = document.getElementById('adventure-name');
  const adventureSubtitle = document.getElementById('adventure-subtitle');
  const adventureContent = document.getElementById('adventure-content');
  const photoGallery = document.getElementById('photo-gallery');

  adventureName.innerHTML = name;
  adventureSubtitle.innerHTML = subtitle;
  adventureContent.innerHTML = content;

  images.forEach(image => {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'col-lg-8';

    imageContainer.innerHTML=`<img alt='image' src="${image}" class='activity-card-image'/>`;

    photoGallery.appendChild(imageContainer);
  })
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  try{
    const photoGallery = document.getElementById('photo-gallery');
    photoGallery.innerHTML='';
    photoGallery.innerHTML = 
      `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner" id='carousel-image-inner'>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      </div>`;

    const carouselImages = document.getElementById('carousel-image-inner'); 
    const carouselExampleControls = document.getElementById('carouselExampleControls')
    const indicators = document.createElement('div');
    indicators.setAttribute('class','carousel-indicators')
    
    images.forEach((image,index) => {
      const carouselImage = document.createElement('div');
      carouselImage.className = `carousel-item ${index === 0? 'active': ''}`;
      carouselImage.innerHTML = `<img alt="image" src="${image}" class="activity-card-image"/>`
      carouselImages.append(carouselImage);
      indicators.innerHTML += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" ${index === 0? 'class="active" aria-current="true"': ''} aria-label="Slide ${index+1}"></button>`
    });
    carouselExampleControls.appendChild(indicators);
  }catch(err){
      return null;
  }
  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  try{
    const reservationPanelSoldOut = document.getElementById('reservation-panel-sold-out');
    const reservationPanelAvailable = document.getElementById("reservation-panel-available");
    const reservationPersonCost = document.getElementById('reservation-person-cost');
    reservationPersonCost.innerHTML = adventure.costPerHead;
    if(adventure.available){
      reservationPanelAvailable.style.display = "block";
      reservationPanelSoldOut.style.display = "none";
    } else{
      reservationPanelAvailable.style.display = "none";
      reservationPanelSoldOut.style.display = "block";
    }
  } catch(err){
    return null;
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  const reservationCost = document.getElementById('reservation-cost');
  reservationCost.innerHTML = persons* adventure.costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  try{
    const {id} =  adventure;
    const formElement = document.getElementById('myForm');

    formElement.addEventListener('submit', async event => {

      event.preventDefault();

      const name = formElement.elements['name'].value;
      const date = formElement.elements['date'].value;
      const person = formElement.elements['person'].value;

      const payload = {
        name,
        date,
        person,
        adventure: id
      }

      const url = config.backendEndpoint + '/reservations/new';

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type" : "application/json"
        }
      });

      const data = await response.json();
    })
  }catch(err){
    return null;
  }
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.getElementById('reserved-banner');
  if(adventure.reserved){
    reservedBanner.style.display = "block";
  } else {
    reservedBanner.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};

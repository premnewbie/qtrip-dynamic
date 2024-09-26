import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const url = config.backendEndpoint + '/reservations/';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(err){
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  const noReservationBanner = document.getElementById('no-reservation-banner');
  const reservationTableParent = document.getElementById('reservation-table-parent');

  if(reservations.length > 0){
    noReservationBanner.style.display = 'none';
    reservationTableParent.style.display = 'block';
  } else{
    noReservationBanner.style.display = 'block';
    reservationTableParent.style.display = 'none';
  }
   
  const reservationTable = document.getElementById('reservation-table');

  reservations.forEach(reservation => {
    const {id,name,adventureName,person,date,price,time,adventure} = reservation;

    const tableRow = document.createElement('tr');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const checkTime = new Date(time).toLocaleString('en-IN');
    let splitDateTime = checkTime.split(',');
    let splitDate = splitDateTime[0].split('/')
    let monthInNum = splitDate[1];
    let bookingTime = `${splitDate[0]} ${months[monthInNum-1]} ${splitDate[2]},${splitDateTime[1]}`

    console.log(bookingTime);

    tableRow.innerHTML = `
      <th>${id}</th>
      <td>${name}</td>
      <td>${adventureName}</td>
      <td>${person}</td>
      <td>${new Date(date).toLocaleDateString('en-IN')}</td>
      <td>${price}</td>
      <td>${bookingTime}</td>
      <td>
        <div class='reservation-visit-button' id='${id}'>
          <a href='../detail/?adventure=${adventure}'>Visit Adventure</a>
        </div>
      </td>
    `
    reservationTable.appendChild(tableRow);
    
  })

}

export { fetchReservations, addReservationToTable };

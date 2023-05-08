console.log("Map Running");
var container = L.DomUtil.get('map');
if(container != null){
    container._leaflet_id = null;
}
const map = L.map('map').setView([41, -74], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const addMarkers = async () => {
    const response = await axios.get('/contacts');
    if (response && response.data && response.data.contacts) {
        for (const contact of response.data.contacts) {
            if (contact.latitude !== '0' && contact.longitude !== '0') {
                //get row from table
                //const tr = document.querySelector(`tr[data-id="${contact.id}"]`);
                L.marker([contact.latitude, contact.longitude])
                    .addTo(map)
                    .bindPopup(contact.nameprefix + " " + contact.fname + " " + contact.lname + "<br>" + contact.street + "<br>" + contact.city + ", " + contact.state + " " + contact.zip)
                    .openPopup();
            }
        }
    }
}

const on_row_click = (latitude, longitude) => {
    /*let row = e.target;
    if (e.target.tagName.toUpperCase() === 'TD') {
        row = e.target.parentNode;
    }*/
    //const latitude = row.dataset.latitude;
    //const longitude = row.dataset.longitude;
    if(latitude === '0' || longitude === '0') {
        alert("No coordinates for this place");
    } else{
        map.flyTo(new L.LatLng(latitude, longitude));
    }
}
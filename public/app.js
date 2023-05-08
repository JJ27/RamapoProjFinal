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

const fnameInput = document.getElementById('fsearch');
const lnameInput = document.getElementById('lsearch');
const contactrows = document.getElementsByClassName('contact-rows');
fnameInput.addEventListener('keyup', function(e) {
    const {value} = e.target;
    const query = value.toLowerCase();
    for (const row of contactrows) {
        let name = row.textContent.trim().split(" ")[1].toLowerCase();
        // compare current name to search input
        if (name.includes(query)) {
            // found name matching search, display it
            row.style.display = "table-row-group";
        } else {
            // no match, don't display name
            row.style.display = "none";
        }
    }
});

lnameInput.addEventListener('keyup', function(e) {
    const {value} = e.target;
    const query = value.toLowerCase();
    for (const row of contactrows) {
        let name = row.textContent.trim().split(" ")[2].toLowerCase();
        // compare current name to search input
        if (name.includes(query)) {
            // found name matching search, display it
            row.style.display = "table-row-group";
        } else {
            // no match, don't display name
            row.style.display = "none";
        }
    }
});


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
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
const contacts = "#{jsonContacts}";
for (const contact of contacts) {
    console.log(contact.nameprefix);
    if (contact.latitude !== '0' && contact.longitude !== '0') {
        L.marker(contact.latitude, contact.longitude)
            .addTo(map)
            .bindPopup(contact.nameprefix + " " + contact.fname + " " + contact.lname + "<br>" + contact.street + "<br>" + contact.city + ", " + contact.state + " " + contact.zip)
            .openPopup();
    }
}
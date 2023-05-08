/*console.log("places.js running");

let markers = [];
let mapglobal;

const addPlace = async () => {
    console.log("addPlace()");
    const label = document.querySelector("#label").value;
    const address = document.querySelector("#address").value;
    await axios.put('/places', { label: label, address: address});
    await loadPlaces();
}

const deletePlace = async (id) => {
    await axios.delete(`/places/${id}`);
    await loadPlaces();
}

const loadPlaces = async () => {
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
    mapglobal = map;
    const response = await axios.get('/places');
    const tbody = document.querySelector('tbody');
    /*while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
        for (var i = 0; i < markers.length; i++) {
            map.removeLayer(markers[i]);
        }
    }

    if (response && response.data && response.data.places) {
        for (const place of response.data.places) {
            if (!(place.latitude === '0') && !(place.longitude === '0')) {
                marker = L.marker([place.latitude, place.longitude]).addTo(map)
                    .bindPopup(`<b>${place.label}</b><br/>${place.address}`);
                markers.push(marker);
            }
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${place.label}</td>
                <td>${place.address}</td>
                <td>${place.latitude}</td>
                <td>${place.longitude}</td>
                <td>
                    <button class='btn btn-danger' onclick='deletePlace(${place.id})'>Delete</button>
                </td>
            `;
            tr.dataset.latitude = place.latitude;
            tr.dataset.longitude = place.longitude;
            tr.onclick = on_row_click;
            tbody.appendChild(tr);
        }
    }
}

const on_row_click = (e) => {
    let row = e.target;
    if (e.target.tagName.toUpperCase() === 'TD') {
        row = e.target.parentNode;
    }
    const latitude = row.dataset.latitude;
    const longitude = row.dataset.longitude;
    if(latitude === '0' || longitude === '0') {
        alert("No coordinates for this place");
    } else{
        mapglobal.flyTo(new L.LatLng(latitude, longitude));
    }
}
*/
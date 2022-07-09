const MainMap = L.map('Map').setView([41.3414506,2.1635851]);
const secretKey = document.getElementById('KEY').innerHTML;
const homeLocation = L.latLng(0,0);
// Add a house icon at the home location
let homeMarker = L.marker(homeLocation).addTo(MainMap);
// Change the icon of the home marker
homeMarker.setIcon(L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
}));


L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key='+secretKey,
    {attribution: '<a href="https://github.com/Sklyvan" title="Copyright">Sklyvan</a>'}).addTo(MainMap);

document.getElementById('KEY').remove(); // Removing the API key after using it for security reasons.
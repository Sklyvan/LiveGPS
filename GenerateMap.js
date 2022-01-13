const MainMap = L.map('Map').setView([41.3414506,2.1635851], 13);
const secretKey = document.getElementById('KEY').innerHTML;

L.tileLayer('https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key='+secretKey,
    {attribution: '<a href="https://github.com/Sklyvan" title="Copyright">Sklyvan</a>'}).addTo(MainMap);

document.getElementById('KEY').remove(); // Removing the API key after using it for security reasons.
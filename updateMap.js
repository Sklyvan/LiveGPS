var markers = []; var polylines = [];
var fitMap = true;

function deg2rad(deg)
{
    return deg * (Math.PI / 180);
}

function calculateDistance(P1, P2)
{
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(P2[0] - P1[0]);
    let dLon = deg2rad(P2[1] - P1[1]);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(P1[0])) * Math.cos(deg2rad(P2[0])) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
}

function updateMapData()
{
    const InformationGPS = document.getElementById('serverData').value;

    if (InformationGPS.length != 0)
    {
        const datetime = InformationGPS.map(function (item) { return [item[0], item[1]]; });
        const latlngs = InformationGPS.map(function (item) { return [parseFloat(item[2]), parseFloat(item[3])]; });
        const speed = InformationGPS.map(function (item) { return parseFloat(item[4]); });
        const initialDate = convertToDate(datetime[0][0]); const initialTime = convertToTime(datetime[0][1]);
        const finalDate = convertToDate(datetime[latlngs.length - 1][0]); const finalTime = convertToTime(datetime[latlngs.length - 1][1]);
        const status = InformationGPS.map(function (item)
        {
            let currentStatus = item[9];
            // Check if 'OCU' is in the status
            if (currentStatus.includes('OCU'))
                return 'OCU';
            if (currentStatus.includes('LIB'))
                return 'LIB';
            else
                return 'None';
        });

        let initialMaker = L.marker(latlngs[0]).addTo(MainMap);
        initialMaker.bindPopup('Inicio: ' + convertToLocalTimezone(initialDate, initialTime));
        let finalMarker = L.marker(latlngs[latlngs.length - 1]).addTo(MainMap);
        finalMarker.bindPopup('Final: ' + convertToLocalTimezone(finalDate, finalTime));


        finalMarker.setIcon(L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        }));

        markers = [initialMaker, finalMarker];
        // For every element inside latlngs, create a marker
        var CurrentStatus = status[0]; // We use this variable to check if the status has changed.
        var ocuDistance = 0; var libDistance = 0; // We use these variable to store the amount of kilometers that the vehicle has traveled in OCU and LIB.
        for (let i = 0; i < latlngs.length-1; i++)
        {
            let P1 = latlngs[i]; let P2 = latlngs[i + 1];

            if (status[i] != 'None')
            {
                CurrentStatus = status[i];
            }

            let polyline;
            if (CurrentStatus == 'OCU')
            {
                polyline = L.polyline([P1, P2], { color: 'RED', opacity: 1 }).addTo(MainMap);
                ocuDistance += calculateDistance(P1, P2);
            }
            else if (CurrentStatus == 'LIB')
            {
                polyline = L.polyline([P1, P2], { color: 'GREEN', opacity: 1 }).addTo(MainMap);
                libDistance += calculateDistance(P1, P2);
            }
            else
            {
                polyline = L.polyline([P1, P2], { color: 'GREY', opacity: 1 }).addTo(MainMap);
            }
            polylines.push(polyline);
        }

        ocuDistance = Math.round(ocuDistance * 100) / 100;
        libDistance = Math.round(libDistance * 100) / 100;

        // If the value is smaller than 10, we add a 0 before the number.
        if (ocuDistance < 10)
            ocuDistance = '0' + ocuDistance;
        if (libDistance < 10)
            libDistance = '0' + libDistance;

        // If there is just one decimal, we add a 0 to the end of the number.
        if (ocuDistance % 1 == 0)
            ocuDistance = ocuDistance + '.00';
        if (libDistance % 1 == 0)
            libDistance = libDistance + '.00';

        // Export this values to the HTML page
        document.getElementById('DistanceOCU').innerHTML = ocuDistance + ' KM';
        document.getElementById('DistanceLIB').innerHTML = libDistance + ' KM';

        if (fitMap)
        {
            let polyline = L.polyline(latlngs);
            MainMap.fitBounds(polyline.getBounds()).zoomIn(0.5);
        }
    }
    else
    {
        MainMap.setView([41.3926467,2.0701497], 12);
    }
}

updateMapData();

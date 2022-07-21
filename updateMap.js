var markers = []; var polylines = [];
var fitMap = true;
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
            }
            else if (CurrentStatus == 'LIB')
            {
                polyline = L.polyline([P1, P2], { color: 'GREEN', opacity: 1 }).addTo(MainMap);
            }
            else
            {
                polyline = L.polyline([P1, P2], { color: 'GREY', opacity: 1 }).addTo(MainMap);
            }
            polylines.push(polyline);
        }

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

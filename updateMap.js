var markers; var polyline;

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

        let initialMaker = L.marker(latlngs[0]).addTo(MainMap);
        initialMaker.bindPopup('Inicio: ' + convertToLocalTimezone(initialDate, initialTime));
        let finalMarker = L.marker(latlngs[latlngs.length - 1]).addTo(MainMap);
        finalMarker.bindPopup('Final: ' + convertToLocalTimezone(finalDate, finalTime));
        markers = [initialMaker, finalMarker];

        polyline = L.polyline(latlngs, {color: 'RED', opacity: 0.75, weight: 3}).addTo(MainMap);
        MainMap.fitBounds(polyline.getBounds());
    }
}

updateMapData();

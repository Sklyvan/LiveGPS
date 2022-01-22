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

        let initialMaker = L.marker(latlngs[0]).addTo(MainMap);
        initialMaker.bindPopup('Inicio: ' + convertToLocalTimezone(initialDate, initialTime));
        let finalMarker = L.marker(latlngs[latlngs.length - 1]).addTo(MainMap);
        finalMarker.bindPopup('Final: ' + convertToLocalTimezone(finalDate, finalTime));
        markers = [initialMaker, finalMarker];
        // For every element inside latlngs, create a marker
        for (let i = 0; i < latlngs.length-1; i++)
        {
            let x1 = latlngs[i]; let x2 = latlngs[i + 1];
            let polyline = L.polyline([x1, x2], { color: 'RED', opacity: 0.75 }).addTo(MainMap);
            polylines.push(polyline);
        }
        let polyline = L.polyline(latlngs);
        if (fitMap) MainMap.fitBounds(polyline.getBounds());
    }
}

updateMapData();

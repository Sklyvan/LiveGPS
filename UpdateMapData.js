import {convertToDate, convertToTime, convertToServerDate, cleanServerData, convertToTimezone} from "./ConvertionFunctions.js";
import {getServerData} from "./ServerRequests.js";

export function updateMapData()
{
    const fromDate = document.getElementById('initialDateButton').value;
    const fromTime = document.getElementById('fromTime').innerHTML;
    const toDate = document.getElementById('finalDateButton').value;
    const toTime = document.getElementById('toTime').innerHTML;

    let InformationGPS = getServerData(fromDate, fromTime, toDate, toTime);
    InformationGPS = cleanServerData(InformationGPS);

    const datetime = InformationGPS.map(function (item) { return [item[0], item[1]]; });
    const latlngs = InformationGPS.map(function (item) { return [parseFloat(item[2]), parseFloat(item[3])]; });
    const speed = InformationGPS.map(function (item) { return parseFloat(item[4]); });

    const initialDate = convertToDate(datetime[0][0]); const initialTime = convertToTime(datetime[0][1]);
    const finalDate = convertToDate(datetime[latlngs.length - 1][0]); const finalTime = convertToTime(datetime[latlngs.length - 1][1]);

    L.marker(latlngs[0]).addTo(MainMap).bindPopup('Inicio: ' + convertToTimezone(initialDate, initialTime)).openPopup();
    L.marker(latlngs[latlngs.length - 1]).addTo(MainMap).bindPopup('Final: ' + convertToTimezone(finalDate, finalTime)).openPopup();

    if (latlngs.length > 0)
    {
        const polyline = L.polyline(latlngs, {color: 'RED', opacity: 0.75, weight: 3}).addTo(MainMap);
        MainMap.fitBounds(polyline.getBounds());
    }
    console.log("Mapa Actualizado!");
}

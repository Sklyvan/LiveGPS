function convertToDate(YYMMDD)
{
    YYMMDD = YYMMDD.toString();
    const YY = YYMMDD.substring(0, 2);
    const MM = YYMMDD.substring(2, 4);
    const DD = YYMMDD.substring(4, 6);
    return DD + '/' + MM + '/20' + YY;
}
function convertToTime(HHMMSSDD)
{
    HHMMSSDD = HHMMSSDD.toString();
    const HH = HHMMSSDD.substring(0, 2);
    const MM = HHMMSSDD.substring(2, 4);
    const SS = HHMMSSDD.substring(4, 6);
    return HH + ':' + MM + ':' + SS;
}

function getTimezone()
{
    let timezone = new Date().getTimezoneOffset();
    timezone = timezone / 60;
    timezone = timezone * -1;
    return timezone;
}

function convertToTimezone(date, time)
{
    date = date.split('/');
    time = time.split(':');
    let currentDate = new Date(date[2], date[1] - 1, date[0], time[0], time[1], time[2], 0);
    let timezone = getTimezone();

    currentDate.setHours(currentDate.getHours() + timezone);
    // Transform currentdate to DD/MM/YYYY HH:MM:SS
    let DD = currentDate.getDate();
    let MM = currentDate.getMonth() + 1;
    let YY = currentDate.getFullYear();
    let HH = currentDate.getHours();
    let MM2 = currentDate.getMinutes();
    let SS = currentDate.getSeconds();
    if (DD < 10) {DD = '0' + DD; }
    if (MM < 10)
    { MM = '0' + MM; }
    if (HH < 10)
    { HH = '0' + HH; }
    if (MM2 < 10)
    { MM2 = '0' + MM2; }
    if (SS < 10)
    { SS = '0' + SS; }
    return DD + '/' + MM + '/' + YY + ' ' + HH + ':' + MM2 + ':' + SS;
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

        var lines = [];

        let initialMaker = L.marker(latlngs[0]).addTo(MainMap);
        initialMaker.bindPopup('Inicio: ' + convertToTimezone(initialDate, initialTime)).openPopup();
        let finalMarker = L.marker(latlngs[latlngs.length - 1]).addTo(MainMap);
        finalMarker.bindPopup('Final: ' + convertToTimezone(finalDate, finalTime));
        markers = [initialMaker, finalMarker];

        if (latlngs.length > 0)
        {
            polyline = L.polyline(latlngs, {color: 'RED', opacity: 0.75, weight: 3}).addTo(MainMap);
            MainMap.fitBounds(polyline.getBounds());
        }
    }
    console.log("Map Updated");
}
var markers = [];
var polyline;
updateMapData();
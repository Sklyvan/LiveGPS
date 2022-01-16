export function cleanServerData(data)
{
    data = data.split('\n'); // Creating an array with the information.
    data.pop(); // Last element is empty.
    data = data.map(function (item)
    {
        // Since some data is in the form of ENGINEINFO[......]
        // we are going to start reading after the first bracket and before it.
        let startReading = item.indexOf('[');
        let endReading = item.indexOf(']');
        let x = item.slice(startReading+1, endReading);
        x = x.split(',');
        x = x.filter(function (item)
        {
            return item.split(',');
        });
        return x;
    });
    return data;
}

export function convertToServerDate(inputDate)
{
    // Convert date in format YYYY-MM-DD to YYMMDD
    let date = inputDate.split('-');
    let YY = date[0].substring(2, 4);
    let MM = date[1];
    let DD = date[2];
    return YY + MM + DD;
}

function getTimezone()
{
    let timezone = new Date().getTimezoneOffset();
    timezone = timezone / 60;
    timezone = timezone * -1;
    return timezone;
}

export function convertToTimezone(date, time)
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

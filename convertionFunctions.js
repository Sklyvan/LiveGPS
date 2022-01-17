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

function convertToLocalTimezone(date, time)
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

function convertToUTCTimezone(date, time)
{
    date = date.split('/');
    time = time.split(':');
    let currentDate = new Date(date[2], date[1] - 1, date[0], time[0], time[1], time[2], 0);
    let timezone = getTimezone();

    currentDate.setHours(currentDate.getHours() - timezone);
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

function convertToServerDate(inputDate)
{
    // Convert date in format YYYY-MM-DD to YYMMDD
    let date = inputDate.split('-');
    let YY = date[0].substring(2, 4);
    let MM = date[1];
    let DD = date[2];
    return YY + MM + DD;
}

function convertToServerTime(inputTime)
{
    // Convert time in format HH:MM:SS to HHMMSS
    let time = inputTime.split(':');
    let HH = time[0];
    let MM = time[1];
    let SS = time[2];
    return HH + MM + SS;
}
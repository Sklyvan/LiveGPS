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

const fromDate = convertToServerDate(document.getElementById('initialDateButton').value);
const toDate = convertToServerDate(document.getElementById('finalDateButton').value);

document.getElementById('initialDateButton').value = fromDate;
document.getElementById('finalDateButton').value = toDate;
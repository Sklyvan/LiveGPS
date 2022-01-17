var fromDate = convertToServerDate(document.getElementById('initialDateButton').value);
var toDate = convertToServerDate(document.getElementById('finalDateButton').value);

document.getElementById('initialDateButton').value = fromDate;
document.getElementById('finalDateButton').value = toDate;
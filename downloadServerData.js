function getServerData(fromDate, fromTime, toDate, toTime)
{
    const httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'http://agic-sl.com/GetData.php?fromDate='+fromDate+'&toDate='+toDate+'&fromTime='+fromTime+'&toTime='+toTime, false);
    httpRequest.send();

    if (httpRequest.status === 200) {return httpRequest.response;}
    else { return httpRequest.status; }
}

function cleanServerData(data)
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

const serverData = getServerData(
    document.getElementById('initialDateButton').value, // fromDate
    document.getElementById('initialTimeButton').innerHTML, // fromTime
    document.getElementById('finalDateButton').value, // toDate
    document.getElementById('finalTimeButton').innerHTML // toTime
);

document.getElementById('serverData').value = cleanServerData(serverData);

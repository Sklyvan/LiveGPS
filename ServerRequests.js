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

const fromDate_ = document.getElementById('initialDateButton').value;
const fromTime_ = document.getElementById('fromTime').innerHTML;
const toDate_ = document.getElementById('finalDateButton').value;
const toTime_ = document.getElementById('toTime').innerHTML;

const serverData = getServerData(fromDate_, fromTime_, toDate_, toTime_);
document.getElementById('serverData').value = cleanServerData(serverData);

export function getServerData(fromDate, fromTime, toDate, toTime)
{
    const httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'http://agic-sl.com/GetData.php?fromDate='+fromDate+'&toDate='+toDate+'&fromTime='+fromTime+'&toTime='+toTime, false);
    httpRequest.send();

    if (httpRequest.status === 200)
    {
        return httpRequest.response;
    }
    else
    {
        return httpRequest.status;
    }
}

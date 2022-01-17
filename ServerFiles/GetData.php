<?php
	include("ConnectionInformation.php");
	$myConnection = mysqli_connect($Host, $dbUser, $dbKey, $dbName);

	$fromDate = $_GET['fromDate']; // YYMMDD
	$fromTime = $_GET['fromTime']; // hhmmss

	$toDate = $_GET['toDate']; // YYMMDD
	$toTime = $_GET['toTime']; // hhmmss

	$query = "SELECT d FROM `$dbTable`";
	$result = mysqli_query($myConnection, $query);

	while($row = mysqli_fetch_array($result))
	{
		$currentData = str_replace(']', '', str_replace('[', '', $row['d']));
		$currentData = (explode(",",$currentData));

		$calendarDate = $currentData[0];
		$calendarClock = $currentData[1];
		$latitude = $currentData[2];
		$longitude = $currentData[3];
		$speed = $currentData[4];
		$altitude = $currentData[5];
		$direction = $currentData[6];
		$quality = $currentData[7];
		$satellites = $currentData[8];

		if (($calendarDate >= $fromDate) AND ($calendarDate <= $toDate))
		{
			if (($calendarClock >= $fromTime) AND ($calendarClock <= $toTime))
			{
				echo $row['d'];
			}
		}
		// http://agic-sl.com/GetData.php?fromDate=210928&toDate=210929&fromTime=11493200&toTime=12493300
	}

	mysqli_close($myConnection);
?>

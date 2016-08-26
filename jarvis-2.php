<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Jarvis 2.0</title>
</head>

<body>

<?php
//Jarvis 2.0
//written in April 2016 by Mush!

//Set the timezone, assume we're in Charlotte. Some day I'll need to re-write this.
	date_default_timezone_set('America/New_York');

//Assume we're in Charlotte for now.
	$lat =  35.2271;
	$lon = -80.8431;

//BUT let's see where we REALLY are
	$loc = htmlspecialchars($_GET["loc"]);
	if ($loc<>"") {
		$lat = substr($loc,0,strpos($loc,","));
		$lon = substr($loc,strlen($lat)+1);
	}

//Fetch the weather and sunset info
	$url="http://api.openweathermap.org/data/2.5/weather?lat=".$lat."&lon=".$lon."&units=imperial&lang=en&appid=748a6c7f19345b508b7a28b7e59a30c4";
	$json=file_get_contents($url);
	$data=json_decode($json,true);
	//Get current Temperature
	$theCurrentTemp = $data['main']['temp'];
	//Get weather condition
	$theCurrentWeather = $data['weather'][0]['main'];
	$theCurrentCity = $data['name'];
	$theWeatherCategory = $data['weather'][0]['id'];
	$theSunset = $data['sys']['sunset'];
	$theSunrise = $data['sys']['sunrise'];
	$theHour = date("G");

	$url="http://api.openweathermap.org/data/2.5/forecast?lat=".$lat."&lon=".$lon."&units=imperial&lang=en&appid=748a6c7f19345b508b7a28b7e59a30c4";
	$json=file_get_contents($url);
	$data=json_decode($json,true);
	$theLastForecastID = count($data['list'])-1;
	$theForecast = $data['list'][$theLastForecastID]['weather'][0]['description'];
	$theFutureTemp = round($data['list'][$theLastForecastID]['main']['temp_max']);
	
	/*
	print_r(array_values($data['list'][$theLastForecastID]['weather']));	
	echo "<br /><br />";
	echo "number of elements in the array is " . count($data['list']);
	echo $data['list'][$theLastForecastID]['main']['temp_max'];*/
	
//Greet the day

	echo "Good ";

	switch ($theHour) {
		case $theHour < 3:
			echo "night";
			break;
		case $theHour < 12:
			echo "morning";
			break;
		case $theHour < 18:
			echo "afternoon";
			break;
		case $theHour >=18:
			echo "night";
			break;
	}
			 
	echo " Mush! ";

//What time is it right now?
	$theTime = date("G i");

	echo "It's " . $theTime . ". ";

//What's up with the sun today?

//Well, is it after noon? Then we'll just do sunset

	if (date("a")=="pm"){
		echo "The sun will set this evening at " . date("G i",$theSunset);;

	} else {
	
	//PHP has a nifty sunrise formula built in... that this is all made redundant by coz I fetched the weather. Still a fun activity!
//	$theSunrise = date_sunrise(time(), SUNFUNCS_RET_TIMESTAMP, $lat, $lon, 90, -4);
	$sunriseDelta = floor((time() - $theSunrise)/60);

	//How long has it been SINCE the sun rose? (we'll account for negatives)

	switch ($sunriseDelta) {
		case $sunriseDelta < -60:
			echo "The sun won't rise until " . date("G i",$theSunrise);
			break;
		case $sunriseDelta < 0:
			echo "The sun has not yet risen. It will rise in " . (-1 * $sunriseDelta) . " minutes at " . date("G i",$theSunrise);
			break;
		case $sunriseDelta < 30:
			echo "The sun rose " . $sunriseDelta . " minutes ago";
			break;
		case $sunriseDelta < 40 :
			echo "The sun rose about a half an hour ago";
			break;			
		case $sunriseDelta < 52 :
			echo "The sun rose about forty five minutes ago at " . date("G i",$theSunrise);
			break;			
		case $sunriseDelta < 70 :
			echo "The sun rose about an hour ago at " . date("G i",$theSunrise);
			break;			
		case $sunriseDelta >= 70 :
			echo "The sun rose this morning at " . date("G i",$theSunrise);
			break;			
		}
	}	
	
	echo ". ";
	
//What's the weather and high for today?

	echo "Right now in " . $theCurrentCity . " it's " . round($theCurrentTemp) . " degrees ";
	switch ($theWeatherCategory) {
		case 200:
			echo "with a thunderstorm with light rain";
		break;
		case 201:
			echo "with a thunderstorm with rain";
		break;
		case 202:
			echo "and there's a thunderstorm with heavy rain";
		break;
		case 210:
			echo "and a light thunderstorm";
		break;
		case 211:
			echo "and it's thunderstorming";
		break;
		case 212:
			echo "and it's heavily thunderstorming";
		break;
		case 221:
			echo "with a ragged thunderstorm";
		break;
		case 230:
			echo "and there's a thunderstorm with light drizzle";
		break;
		case 231:
			echo "and there's a thunderstorm with drizzle";
		break;
		case 232:
			echo "and there's a thunderstorm with heavy drizzle";
		break;
		case 300:
			echo "with light intensity drizzle";
		break;
		case 301:
			echo "with drizzle";
		break;
		case 302:
			echo "with some heavy intensity drizzle";
		break;
		case 310:
			echo "with some light intensity drizzle rain";
		break;
		case 311:
			echo "with some drizzle rain";
		break;
		case 312:
			echo "with heavy intensity drizzle rain";
		break;
		case 313:
			echo "with shower rain and drizzle";
		break;
		case 314:
			echo "with heavy shower rain and drizzle";
		break;
		case 321:
			echo "with shower drizzle";
		break;
		case 500:
			echo "with some light rain";
		break;
		case 501:
			echo "with moderate rain";
		break;
		case 502:
			echo "with some heavy intensity rain";
		break;
		case 503:
			echo "with very heavy rain";
		break;
		case 504:
			echo "with extreme rain";
		break;
		case 511:
			echo "with freezing rain";
		break;
		case 520:
			echo "with light intensity shower rain";
		break;
		case 521:
			echo "with some shower rain";
		break;
		case 522:
			echo "with some heavy intensity shower rain";
		break;
		case 531:
			echo "with some ragged shower rain";
		break;
		case 600:
			echo "with light snow";
		break;
		case 601:
			echo "and it's snowing";
		break;
		case 602:
			echo "and there's heavy snow";
		break;
		case 611:
			echo "and it's sleeting";
		break;
		case 612:
			echo "and there's shower sleet";
		break;
		case 615:
			echo "with some light rain and snow";
		break;
		case 616:
			echo "with rain and snow";
		break;
		case 620:
			echo "with light shower snow";
		break;
		case 621:
			echo "with some shower snow";
		break;
		case 622:
			echo "with some heavy shower snow";
		break;
		case 701:
			echo "and it's misting";
		break;
		case 711:
			echo "and there's smoke";
		break;
		case 721:
			echo "and it's hazy";
		break;
		case 731:
			echo "with sand and dust whirls";
		break;
		case 741:
			echo "and it's foggy";
		break;
		case 751:
			echo "with sand";
		break;
		case 761:
			echo "with dust";
		break;
		case 762:
			echo "with volcanic ash";
		break;
		case 771:
			echo "with some squalls";
		break;
		case 781:
			echo "and there's a tornado";
		break;
		case 800:
			echo "and it's clear out";
		break;
		case 801:
			echo "and there are a few clouds";
		break;
		case 802:
			echo "with some scattered clouds";
		break;
		case 803:
			echo "with some broken clouds";
		break;
		case 804:
			echo "with some overcast clouds";
		break;
		case 900:
			echo "and there's a tornado";
		break;
		case 901:
			echo "and there's a tropical storm";
		break;
		case 902:
			echo "and there's a hurricane";
		break;
		case 903:
			echo "and it's cold";
		break;
		case 904:
			echo "and it's hot";
		break;
		case 905:
			echo "and it's windy";
		break;
		case 906:
			echo "and there's hail";
		break;
		case 951:
			echo "and it's calm";
		break;
		case 952:
			echo "and there's a light breeze";
		break;
		case 953:
			echo "and there's agentle breeze";
		break;
		case 954:
			echo "and there's a moderate breeze";
		break;
		case 955:
			echo "with a fresh breeze";
		break;
		case 956:
			echo "with a strong breeze";
		break;
		case 957:
			echo "with high wind, near gale";
		break;
		case 958:
			echo "with a gale";
		break;
		case 959:
			echo "and there's a severe gale";
		break;
		case 960:
			echo "and it's storming";
		break;
		case 961:
			echo "with violent storms going on";
		break;
		case 962:
			echo "and there's a hurricane";
		break;
	}
	
	echo ". ";
	
	echo "Later today the forecast is for " . $theForecast . " with a high of " . $theFutureTemp . ". ";
	
//Any upcoming birthdays?

//Do you want to listen to the news?

//What about some music?


?>

</body>
</html>
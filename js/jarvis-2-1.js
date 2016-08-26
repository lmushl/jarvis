/* 
Jarvis 2.1
written in August 2016 by Mush!

Major Changes from 2.0: switching from PHP to jQuery

The goal with this project is to make a "J.A.R.V.I.S." type wakeup greeting from Iron Man (https://www.youtube.com/watch?v=sXH2K2ZlrjQ). 
I use Tasker on my Android phone, which will fire off a 'task' once I dismiss my morning alarm.
I want to have my phone say something like the following:
"Good morning Mush! It's 6:15. The sun rose twelve minutes ago at 6:03. Sunset tonight is at 7:59. Right now in Charlotte it's 76 degrees and it's raining. Later today the high will be 92 degrees and it will thunderstorm."
So I need to do the following:
Figure out the time
Figure out when the sun rose, and how that relates to the current time.
Figure out when the sun will set
Figure out the current temp and weather
Figure out the future temp and weather
Format all this information into a coherent sentence.
*/

$(function(){
	// leaving this here just in case...
});

//Get the timezone difference
//get the current hour
var d = new Date();
var theHour = d.getHours();
var n = d.getTimezoneOffset();

//set up two blank arrays ahead of time, for the forecast.
var tempArray = new Array;
var weatherArray = new Array;

//Assume we're in Charlotte for now.
var lat =  35.2271;
var lon = -80.8431;

// BUT let's see where we REALLY are! Let's have this be flexible enough to get loc from URL or from Tasker (Android)

// Get the location dynamically from the URL
$.urlParam = function(name){
	try {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		return results[1] || 0;		
	} catch {
		console.log("no " & name & " provided by URL");
	}
}

lat = urlParam(lat);
lon = urlParam(lon);

//get the latitude and logitude from the URL (should be passed from Tasker)
try { var latlongarr = global("LOCN").split(",");
	if(latlongarr[0]!=""){
		lat = latlongarr[0];
		lon = latlongarr[1];
	}
} catch(err) {
	console.log("no local loc provided")
}

// set up our soon-to-be-assigned variables
var myKey = "748a6c7f19345b508b7a28b7e59a30c4";
var theCurrentTemp;
var theCurrentWeather;
var theCurrentCity;
var theWeatherCategory;
var theSunset = new Date();
var theSunrise = new Date;
var futureWeather
var myWeather;

// Fetch the current weather and sunset info. This is just current weather info.
// I was originally doing this (and the forecast) with with a .getJSON but I needed it to be synchronous with the page load.
var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&lang=en&appid=" + myKey;
$.ajax({
	async:false,
	url:weatherURL,
	success: function(data){
		theCurrentTemp = data.main.temp;
		theCurrentWeather = data.weather[0].main;
		theCurrentCity = data.name;
		theWeatherCategory = data.weather[0].id;
		theSunset = data.sys.sunset*1000;
		theSunrise = data.sys.sunrise*1000;
	}
});

// Fetch the forecast info. The service I use only gives granularity of 3 hours, so you'll never see more than eight (seven) values for today.
var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&lang=en&appid=" + myKey;
$.ajax({
	async:false,
	url:forecastURL,
	success: function(data){
		//go through all forty(!) forecasts, and identify the ones that are for today only
		for(i = 0; i<40; i++){
			if (data.list[i].dt_txt.substring(8,10) == d.getDate()) {
				tempArray[i] = data.list[i].main.temp_max;
				weatherArray[i] = data.list[i].weather[0].id;
			}
		}
		
		// see what the highest temp will be, as well as the weather at that time
		var maxTemp = 0;
		
		for (i = 0; i<tempArray.length; i++) {
			if (tempArray[i] > maxTemp) {
				maxTemp = Math.round(tempArray[i]);
				futureWeather = weatherArray[i];
			}
		}
	
	}
});

// Figure out how to greet me. Usually I'll be running this in the morning, but it's a simple thing to give it some flexibility
function timeOfDay(hr) {
	switch (true) {
		case (hr < 3):
			return "night";
			break;
		case (hr < 12):
			return "morning";
			break;
		case (hr < 18):
			return "afternoon";
			break;
		case (hr >=18):
			return "night";
			break;
		default:
			return "day";
		}
}

// Craft the first part of the greeting ("good day" and the time)
function displayGreeting() {
	return "Good " + timeOfDay(theHour) + " Mush! It's " + d.getHours() + " " + (d.getMinutes()<10?'0':'') + d.getMinutes() + ". ";
}

// Craft the sunrise & sunset part of the greeting
function displaySunStuff() {
	var theMessage = "";


	// Is it still morning? Let's figure our when the sun rose.
	if (d.getHours() < 12) {		
	// Figure out how long since the sun rose or until the sun rises
	var sunriseDelta = (d.getTime() - theSunrise.getTime())/60000;
		switch (true) {
			case (sunriseDelta < -60):
				theMessage += "The sun won't rise until " + theSunrise.getHours() + " " + (theSunrise.getMinutes()<10?'0':'') + theSunrise.getMinutes() + ". ";
				break;
			case (sunriseDelta < 0):
				theMessage += "The sun hasn't risen yet. It will rise in " + (-1 * sunriseDelta) + " minutes at " + theSunrise.getHours() + " " + (theSunrise.getMinutes()<10?'0':'') + theSunrise.getMinutes() + ". ";
				break;
			case sunriseDelta < 30:
				theMessage += "The sun rose " + sunriseDelta + " minutes ago" + ". ";
				break;
			case sunriseDelta < 40 :
				theMessage += "The sun rose about a half an hour ago" + ". ";
				break;			
			case sunriseDelta < 52 :
				theMessage += "The sun rose about forty five minutes ago at " + theSunrise.getHours() + " " + (theSunrise.getMinutes()<10?'0':'') + theSunrise.getMinutes() + ". ";
				break;			
			case sunriseDelta < 70 :
				theMessage += "The sun rose about an hour ago at " + theSunrise.getHours() + " " + (theSunrise.getMinutes()<10?'0':'') + theSunrise.getMinutes() + ". ";
				break;			
			case sunriseDelta >= 70 :
				theMessage += "The sun rose this morning at " + theSunrise.getHours() + " " + (theSunrise.getMinutes()<10?'0':'') + theSunrise.getMinutes() + ". ";
				break;			
		}
	}

	// Add on the sunset info
	theMessage += "Sunset this evening is at " + theSunset.getHours() + " " + (theSunset.getMinutes()<10?'0':'') + theSunset.getMinutes() + ". ";
	
	return theMessage;
}

// Craft the weather part of the message
function displayWeather() {
	var theMessage = "";
	theMessage += "Right now in " + theCurrentCity + " it's " + Math.round(theCurrentTemp, "p") + " degrees " + weatherCodeToText(theWeatherCategory, "p");
	
	theMessage += ". ";
	
	theMessage += "Later today the high is expected to be " + maxTemp + " " + weatherCodeToText(futureWeather, "f") + ". ";
	return theMessage;
}

// The weather gets returned as a short description and a weather code. I take the code and run it through a mini parser so that I can account for present and future tenses.
// All these codes are saved in a spreadsheet so that I can efficiently update them.
function weatherCodeToText(code, tense) {
	// figure out the tense ("present" uses "it's -ing" and "there's", "future" uses indefinite tense and "there will be"
	if (tense="p") {
		var prefixIs = "it's";
		var prefixThere = "there's";
		var suffixIng = "ing";
	}
	if (tense="f") {
		var prefixIs = "it will";
		var prefixThere = "there will be";
		var suffixIng = "";
	}
	
	switch (code) {
		case (200):
			return "with a thunderstorm with light rain";
		break;
		case (201):
			return "with a thunderstorm with rain";
		break;
		case (202):
			return "and " + prefixThere + " a thunderstorm with heavy rain";
		break;
		case (210):
			return "with a light thunderstorm";
		break;
		case (211):
			return "and " + prefixIs + " thunderstorm" + varIng + "";
		break;
		case (212):
			return "and " + prefixThere + " a heavy thunderstorm";
		break;
		case (221):
			return "with a ragged thunderstorm";
		break;
		case (230):
			return "and " + prefixThere + " a thunderstorm with light drizzle";
		break;
		case (231):
			return "and " + prefixThere + " a thunderstorm with drizzle";
		break;
		case (232):
			return "and " + prefixThere + " a thunderstorm with heavy drizzle";
		break;
		case (300):
			return "with light intensity drizzle";
		break;
		case (301):
			return "with drizzle";
		break;
		case (302):
			return "with some heavy intensity drizzle";
		break;
		case (310):
			return "with some light intensity drizzle rain";
		break;
		case (311):
			return "with some drizzle rain";
		break;
		case (312):
			return "with heavy intensity drizzle rain";
		break;
		case (313):
			return "with shower rain and drizzle";
		break;
		case (314):
			return "with heavy shower rain and drizzle";
		break;
		case (321):
			return "with shower drizzle";
		break;
		case (500):
			return "with some light rain";
		break;
		case (501):
			return "with moderate rain";
		break;
		case (502):
			return "with some heavy intensity rain";
		break;
		case (503):
			return "with very heavy rain";
		break;
		case (504):
			return "with extreme rain";
		break;
		case (511):
			return "with freezing rain";
		break;
		case (520):
			return "with light intensity shower rain";
		break;
		case (521):
			return "with some shower rain";
		break;
		case (522):
			return "with some heavy intensity shower rain";
		break;
		case (531):
			return "with some ragged shower rain";
		break;
		case (600):
			return "with light snow";
		break;
		case (601):
			return "and " + prefixIs + " snow" + varIng + "";
		break;
		case (602):
			return "and " + prefixThere + " heavy snow";
		break;
		case (611):
			return "and " + prefixIs + " sleet" + varIng + "";
		break;
		case (612):
			return "and " + prefixThere + " shower sleet";
		break;
		case (615):
			return "with some light rain and snow";
		break;
		case (616):
			return "with rain and snow";
		break;
		case (620):
			return "with light shower snow";
		break;
		case (621):
			return "with some shower snow";
		break;
		case (622):
			return "with some heavy shower snow";
		break;
		case (701):
			return "and " + prefixIs + " mist" + varIng + "";
		break;
		case (711):
			return "and " + prefixThere + " smoke";
		break;
		case (721):
			return "and " + prefixIs + " hazy";
		break;
		case (731):
			return "with sand and dust whirls";
		break;
		case (741):
			return "and " + prefixIs + " foggy";
		break;
		case (751):
			return "with sand";
		break;
		case (761):
			return "with dust";
		break;
		case (762):
			return "with volcanic ash";
		break;
		case (771):
			return "with some squalls";
		break;
		case (781):
			return "and " + prefixThere + " a tornado";
		break;
		case (800):
			return "and clear";
		break;
		case (801):
			return "and there are a few clouds";
		break;
		case (802):
			return "with some scattered clouds";
		break;
		case (803):
			return "with some broken clouds";
		break;
		case (804):
			return "with some overcast clouds";
		break;
		case (900):
			return "and " + prefixThere + " a tornado";
		break;
		case (901):
			return "and " + prefixThere + " a tropical storm";
		break;
		case (902):
			return "and " + prefixThere + " a hurricane";
		break;
		case (903):
			return "and " + prefixIs + " cold";
		break;
		case (904):
			return "and " + prefixIs + " hot";
		break;
		case (905):
			return "and " + prefixIs + " windy";
		break;
		case (906):
			return "and " + prefixThere + " hail";
		break;
		case (951):
			return "and " + prefixIs + " calm out";
		break;
		case (952):
			return "and " + prefixThere + " a light breeze";
		break;
		case (953):
			return "and " + prefixThere + " agentle breeze";
		break;
		case (954):
			return "and " + prefixThere + " a moderate breeze";
		break;
		case (955):
			return "with a fresh breeze";
		break;
		case (956):
			return "with a strong breeze";
		break;
		case (957):
			return "with high wind, near gale";
		break;
		case (958):
			return "with a gale";
		break;
		case (959):
			return "and " + prefixThere + " a severe gale";
		break;
		case (960):
			return "and " + prefixIs + " storm" + varIng + "";
		break;
		case (961):
			return "with violent storms go" + varIng + " on";
		break;
		case (962):
			return "and " + prefixThere + " a hurricane";
		break;

	}
}

// If you load this as the Jarvis HTML page, it'll update the page.
document.write(displayGreeting());
document.write(displaySunStuff());
document.write(displayWeather());

// If you run it as a plain script, it'll set a variable. I use this for Tasker.
var thegreeting = displayGreeting() + displaySunStuff() + displayWeather();
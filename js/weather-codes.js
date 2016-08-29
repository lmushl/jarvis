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
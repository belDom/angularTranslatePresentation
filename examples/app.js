'use strict';

//-- Our translations
var englishTranslations = {
	'THIS_IS_AN_EXAMPLE': 'This is an example',
	'ONLY_ENGLISH': 'This text is only in english',
	'NESTED': {
		'NESTED_EXAMPLE': 'This is a nested example',
		'NESTED': 'This is an example of a shortcut'
	},
	'COMMON': {
		'SEND': 'This is a common text'
	},
	'COMMON_ANOTHER': {
		'SEND': '@:COMMON.SEND'
	},
	'WEEK_DAYS': {
		'MONDAY': 'Monday',
		'TUESDAY': 'Tuesday',
		'WEDNESDAY': 'Wednesday',
		'THRUSDAY': 'Thursday',
		'FRIDAY': 'Friday',
		'SATURDAY': 'Saturday',
		'SUNDAY': 'Sunday'
	},
	'USING_DIRECTIVE': 'We are using angular-translate as a directive',
	'SAY_HELLO': 'Welcome, {{username}}. We missed you!',
	'UI_GRID': {
		'NAME': 'First name',
		'LAST_NAME': 'Last name',
		'COMPANY': 'Company'
	}
};

var germanTranslations = {
	'THIS_IS_AN_EXAMPLE': 'Dies ist ein Beispiel',
	'NESTED': {
		'NESTED_EXAMPLE': 'Dies ist ein Beispiel nested',
		'NESTED': 'Dies ist ein Beispiel einer Kontext'
	},
	'COMMON_ANOTHER': {
		'SEND': '@:COMMON.SEND'
	},
	'WEEK_DAYS': {
		'MONDAY': 'Montag',
		'TUESDAY': 'Dienstag',
		'WEDNESDAY': 'Mittwoch',
		'THRUSDAY': 'Donnerstag',
		'FRIDAY': 'Freitag',
		'SATURDAY': 'Samstag',
		'SUNDAY': 'Sonntag'
	},
	'USING_DIRECTIVE': 'Wir sind mit Winkel übersetzen als eine Richtlinie',
	'SAY_HELLO': 'Herzlich willkommen, {{username}}. Wir verpassten Sie!',
	'UI_GRID': {
		'NAME': 'Vorname',
		'LAST_NAME': 'Nachname',
		'COMPANY': 'Unternehmen'
	}
};

var spanishTranslations = {
	'THIS_IS_AN_EXAMPLE': 'Esto es un ejemplo',
	'NESTED': {
		'NESTED_EXAMPLE': 'Este es un ejemplo nested',
		'NESTED': 'Este es un ejemplo de un acceso directo'
	},
	'COMMON_ANOTHER': {
		'SEND': '@:COMMON.SEND'
	},
	'WEEK_DAYS': {
		'MONDAY': 'Lunes',
		'TUESDAY': 'Martes',
		'WEDNESDAY': 'Miércoles',
		'THRUSDAY': 'Jueves',
		'FRIDAY': 'Viernes',
		'SATURDAY': 'Sábado',
		'SUNDAY': 'Domingo'
	},
	'USING_DIRECTIVE': 'Estamos utilizando angular-translate como una directiva',
	'SAY_HELLO': 'Bienvenido, {{username}}. ¡Te echamos de menos!',
	'UI_GRID': {
		'NAME': 'Nombre',
		'LAST_NAME': 'Apellido',
		'COMPANY': 'Empresa'
	}
};

var app = angular.module('app', ['pascalprecht.translate', 'ui.grid', 'tmh.dynamicLocale']);

app.config(['$translateProvider', function ($translateProvider) {

	// -- It is important to set up a fallback language. The fallback language is the language that is going to be used when the translation for the translation_ID was not found.
	$translateProvider.fallbackLanguage('en');
	//-- We can also have an array of fallback languages, which are chosen in the order declarted.
	//$translateProvider.fallbackLanguage(['en', 'de']);

	// -- Where the languages keys are registered. The main goal is that no matter what subtype of language the user selects, it is going to fallback to the ones that we have available. Example: en_UK, en_Us
	$translateProvider.registerAvailableLanguageKeys(['en', 'de', 'es'], {
		'en_*': 'en',
		'de_*': 'de',
		'es_*': 'es'
	});

	// -- Where we define our translations. The JSON files containing the translations for the specific languages can be defined on separate files.
	// -- The translations_IDs must be the same on the different languages.
	$translateProvider.translations('en', englishTranslations);
	$translateProvider.translations('de', germanTranslations);
	$translateProvider.translations('es', spanishTranslations);

	//-- Apply sanitize. Angular Sanitize is needed in order the result is escaped correctly, which would make our app vurnerable. This is suggested by the angular-translate authors.
	$translateProvider.useSanitizeValueStrategy('escape');

	// -- We can force a preferred language
	$translateProvider.preferredLanguage('en');

	// -- Or we can delegate this to the browser by using:
	$translateProvider.determinePreferredLanguage();
}]);

app.controller('mainCtrl', ['$scope', '$translate', 'tmhDynamicLocale', function ($scope, $translate, tmhDynamicLocale) {
	//-- Only for demo purposes
	$scope.viewSelected = '';
	$scope.currentDate = new Date();

	//-- When translating a single translation IDs with $translate service.
	$translate('WEEK_DAYS.MONDAY').then(function (day) {
		$scope.monday = day;
	});

	//-- When translating multiple translation IDs with $translate service.
	$translate(['WEEK_DAYS.TUESDAY', 'WEEK_DAYS.WEDNESDAY']).then(function (response) {
		$scope.tuesday = response['WEEK_DAYS.TUESDAY'];
		$scope.wednesday = response['WEEK_DAYS.WEDNESDAY'];
	});

	//-- Translating inside a ng-repeat
	$scope.daysOfTheWeek = [
	{day: 'WEEK_DAYS.MONDAY'}, 
	{day:'WEEK_DAYS.TUESDAY'}, 
	{day: 'WEEK_DAYS.WEDNESDAY'}, 
	{day: 'WEEK_DAYS.THRUSDAY'}, 
	{day: 'WEEK_DAYS.FRIDAY'}, 
	{day: 'WEEK_DAYS.SATURDAY'}, 
	{day: 'WEEK_DAYS.FRIDAY'}
	];

	//-- For changing the language
	$scope.changeLanguage = function (key) {
		$translate.use(key);
		tmhDynamicLocale.set(key);
	}

	//-- This is for UI-GRID
	$scope.gridOptions = {};

	$scope.gridOptions.columnDefs = [
	{ displayName: 'UI_GRID.NAME', field: 'name', headerCellFilter: 'translate',enableFiltering: false  },
	{ displayName: 'UI_GRID.LAST_NAME', field: 'lastName', headerCellFilter: 'translate',enableFiltering: false  },
	{ displayName: 'UI_GRID.COMPANY', field: 'company', headerCellFilter: 'translate', enableFiltering: false  }
	];
	$scope.gridOptions.data = [
	{"name": "Cox", "lastName": "Carney", "company": "Enormo"}, 
	{"name": "Lorraine", "lastName": "Wise", "company": "Comveyer"}, 
	{"name": "Nancy", "lastName": "Waters", "company": "Fuelton"}
	];

	//-- This is for high charts
	var methodtowrite = {
		'highcharts.months.arrayFrench': function () { return ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']; },
		'highcharts.months.arraySpanish': function () { return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']; },
		'highcharts.months.loading': function() { return 'loading';}
	};

	Highcharts.setOptions({
		lang: {
			loading: methodtowrite['highcharts.months.loading'](),
			months: methodtowrite['highcharts.months.arrayFrench']()
		}
	});

	var chart = new Highcharts.Chart({
		chart: {
			renderTo: 'highChartsGraph'
		},
		xAxis: {
			type: 'datetime',
			dateTimeLabelFormats: {
				month: '%B'
			}
		},
		yAxis: {},
		series: [{
			data: [0.029, 71.5, 1.06, 92, 140, 1.760, 135, 80, 0.0216, 0.194, 9.56, 54.4]  ,
			pointStart: Date.UTC(2010, 0, 1),
            pointInterval: 30 * 24 * 3600 * 1000 // 30 days
        }]
    });
}]);
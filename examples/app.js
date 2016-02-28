'use strict';

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
	'WEEK_DAYS': {
		'MONDAY': 'Monday',
		'TUESDAY': 'Tuesday',
		'WEDNESDAY': 'Wednesday',
		'THRUSDAY': 'Thursday',
		'FRIDAY': 'Friday',
		'SATURDAY': 'Saturday',
		'SUNDAY': 'Sunday'
	},
	'SAY_HELLO': 'Welcome, {{username}}. We missed you!'
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
	'SAY_HELLO': 'Herzlich willkommen, {{username}}. Wir verpassten Sie!'
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
	'SAY_HELLO': 'Bienvenido, {{username}}. ¡Te echamos de menos!'
};

var app = angular.module('app', ['pascalprecht.translate']);

app.config(['$translateProvider', function ($translateProvider) {

	// -- It is important to set up a fallback language. To set up a fallback language is important because it would be the language set as defeault when the text does not have any translation.
	$translateProvider.fallbackLanguage('en');

	// -- Where the languages keys are registered. The main goal is that no matter what subtype of language the user selects it is going to fallback to the ones that we have available.
	// -- Useful for when the browser will set up the language. This is important for when trying to avoid the language subfix. Ex: en_UK, en_US.
	$translateProvider.registerAvailableLanguageKeys(['en', 'de', 'es'], {
		'en_*': 'en',
		'de_*': 'de',
		'es_*': 'es'
	});

	// -- Where we define our translations. The JSON files containing the translations for the specific languages can be defined on separate files and imported with the keyword require.
	// -- The variables must match exactly.
	$translateProvider.translations('en', englishTranslations);
	$translateProvider.translations('de', germanTranslations);
	$translateProvider.translations('es', spanishTranslations);

	//-- Apply sanitize. Angular Sanitize is needed in order the result is escaped correctly, which would make our app vurnerable. This is suggested by the angular-translate authors.
	$translateProvider.useSanitizeValueStrategy('escape');

	// -- The preferred language by default
	//$translateProvider.preferredLanguage('en');
	// -- Delegating the preferred language to the window.naviga
	$translateProvider.determinePreferredLanguage();

	//-- For using the local storage
	//$translateProvider.useLocalStorage();
}]);

app.controller('mainCtrl', ['$scope', '$translate', function ($scope, $translate) {
	//-- Only for demo purposes
	$scope.viewSelected = '';

	//-- When translating a single translation IDs
	$translate('WEEK_DAYS.MONDAY').then(function (day) {
		$scope.monday = day;
	});

	//-- When translating multiple translation IDs
	$translate('WEEK_DAYS.TUESDAY', 'WEEK_DAYS.WEDNESDAY').then(function (response) {
		$scope.tuesday = response.TUESDAY;
		$scope.wednesday = response.WEDNESDAY;
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
	}
}]);
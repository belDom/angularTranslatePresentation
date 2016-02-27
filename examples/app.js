'use strict';

var app = angular.module('app', ['pascalprecht.translate']);

app.config(['$translateProvider', function ($translateProvider) {

	// -- The language to use when there is non selected
	$translateProvider.fallbackLanguage('en');

	// -- Where the languages keys are registered. The main goal is that no matter what subtype of language the user selects it is going to fallback to the ones that we have available.
	$translateProvider.registerAvailableLanguageKeys(['en', 'de', 'es'], {
		'en_*': 'en',
		'de_*': 'de',
		'es_*': 'es'
	});

	// -- Where we define our translations. The JSON files containing the translations for the specific languages can be defined on separate files and imported with the keyword require.
	$translateProvider.translations('en', {
		'TITLE': 'Hello',
		'FOO': 'This is a paragraph'
	});
	$translateProvider.translations('de', {
		'TITLE': 'Hallo',
		'FOO': 'Dies ist ein Absatz'
	});

	//-- Apply sanitize. Angular Sanitize is needed in order the result is escaped correctly, which would make our app vurnerable.
	$translateProvider.useSanitizeValueStrategy('escape');

	// -- The preferred language by default
	$translateProvider.preferredLanguage('en');
}]);

app.controller('mainCtrl', ['$scope', function ($scope) {
	$scope.helloWorld = 'Hola Mundo';
}]);
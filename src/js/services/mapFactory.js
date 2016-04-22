mainApp.factory('MapFactory', [
	function MapFactory() {
		'use strict';

		return {
			map: [
				{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water',
					special: 'start'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'either'
				},{
					type: 'mountain'
				},{
					type: 'mountain'
				},{
					type: 'mountain'
				},{
					type: 'mountain'
				},{
					type: 'mountain'
				},{
					type: 'mountain'
				},{
					type: 'mountain'
				},{
					type: 'either'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'mountain'
				},{
					type: 'mountain'
				},{
					type: 'mountain'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water'
				},{
					type: 'water',
					special: 'finish'
				},{
					type: 'water',
					special: 'finish'
				},{
					type: 'water',
					special: 'finish'
				},{
					type: 'water',
					special: 'finish'
				},{
					type: 'water',
					special: 'finish'
				},{
					type: 'water',
					special: 'finish'
				}
			],
			configureMap: [
				{
					type: 'water',
					spaces: 5
				},
				{
					special: 'start',
					type: 'water',
					spaces: 1
				},
				{
					type: 'water',
					spaces: 17
				},
				{
					type: 'either',
					spaces: 1
				},
				{
					type: 'mountain',
					spaces: 7
				},
				{
					type: 'either',
					spaces: 1
				},
				{
					type: 'water',
					spaces: 5
				},
				{
					type: 'mountain',
					spaces: 3
				},
				{
					type: 'water',
					spaces: 4
				},
				{
					special: 'finish',
					type: 'water',
					spaces: 11
				}
			]
		};
	}
]);
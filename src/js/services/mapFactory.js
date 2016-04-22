mainApp.factory('MapFactory', [
	function MapFactory() {
		'use strict';

		return {
			map: [
				{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water',
					special: 'start'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'mixed'
				},{
					terrain: 'mountain'
				},{
					terrain: 'mountain'
				},{
					terrain: 'mountain'
				},{
					terrain: 'mountain'
				},{
					terrain: 'mountain'
				},{
					terrain: 'mountain'
				},{
					terrain: 'mountain'
				},{
					terrain: 'mixed'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'mountain'
				},{
					terrain: 'mountain'
				},{
					terrain: 'mountain'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water'
				},{
					terrain: 'water',
					special: 'finish'
				},{
					terrain: 'water',
					special: 'finish'
				},{
					terrain: 'water',
					special: 'finish'
				},{
					terrain: 'water',
					special: 'finish'
				},{
					terrain: 'water',
					special: 'finish'
				},{
					terrain: 'water',
					special: 'finish'
				}
			],
			configureMap: [
				{
					terrain: 'water',
					spaces: 5
				},
				{
					special: 'start',
					terrain: 'water',
					spaces: 1
				},
				{
					terrain: 'water',
					spaces: 17
				},
				{
					terrain: 'mixed',
					spaces: 1
				},
				{
					terrain: 'mountain',
					spaces: 7
				},
				{
					terrain: 'mixed',
					spaces: 1
				},
				{
					terrain: 'water',
					spaces: 5
				},
				{
					terrain: 'mountain',
					spaces: 3
				},
				{
					terrain: 'water',
					spaces: 4
				},
				{
					special: 'finish',
					terrain: 'water',
					spaces: 11
				}
			]
		};
	}
]);
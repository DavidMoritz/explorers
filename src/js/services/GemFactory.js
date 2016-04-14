mainApp.factory('ItemFactory', [
	function GemFactory() {
		'use strict';

		return {
			allItems: [{
				name: 'wood',
				display: 'Wood',
				btnClass: 'info',
				color: 'brown'
			}, {
				name: 'fur',
				display: 'Fur',
				btnClass: 'warning',
				color: 'yellow'
			}, {
				name: 'meat',
				display: 'Food',
				btnClass: 'danger',
				color: 'red'
			}, {
				name: 'supplies',
				display: 'Supplies',
				btnClass: 'success',
				color: 'gray'
			}, {
				name: 'canoe',
				display: 'Canoes',
				btnClass: 'primary',
				color: 'blue'
			}, {
				name: 'horse',
				display: 'Horses',
				btnClass: 'default',
				color: 'white'
			}]
		};
	}
]);

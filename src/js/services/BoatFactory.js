mainApp.factory('BoatFactory', [
	function BoatFactory() {
		'use strict';

		return {
			startIndian: _ => new Array(
				{
					id: 'BI11',
					cost: _ => 0,
					capacity: 1,
					priority: 1,
					content: []
				},{
					id: 'BI21',
					cost: function cost() {
						return this.content.length;
					},
					capacity: 20,
					priority: 4,
					content: []
				}
			),
			startSupply: _ => new Array(
				{
					id: 'BS11',
					cost: _ => 0,
					capacity: 3,
					priority: 1,
					content: []
				},{
					id: 'BS21',
					cost: function cost() {
						return this.content.length ? 1 : 0;
					},
					capacity: 3,
					priority: 4,
					content: []
				},{
					id: 'BS31',
					cost: function cost() {
						return this.content.length;
					},
					capacity: 5,
					priority: 5,
					content: []
				}
			),
			indiansmall: () => _.clone({
				id: 'BI12',
				cost: _ => 0,
				capacity: 1,
				priority: 2,
				content: []
			}),
			indianbig: () => _.clone({
				id: 'BI31',
				cost: function cost() {
					return this.content.length ? 1 : 0;
				},
				capacity: 3,
				priority: 3,
				content: []
			}),
			supplysmall: () => _.clone({
				id: 'BS41',
				cost: _ => 0,
				capacity: 2,
				priority: 2,
				content: []
			}),
			supplybig: () => _.clone({
				id: 'BS51',
				cost: function cost() {
					return this.content.length ? 1 : 0;
				},
				capacity: 5,
				priority: 3,
				content: []
			})
		};
	}
]);

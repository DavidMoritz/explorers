mainApp.factory('BoatFactory', [
	function BoatFactory() {
		'use strict';

		return {
			startIndian: () => new Array(
				{
					cost: () => 0,
					capacity: 1,
					content: []
				},{
					cost: function cost() {
						return this.content.length;
					},
					capacity: 20,
					content: []
				}
			),
			startSupply: () => new Array(
				{
					cost: () => 0,
					capacity: 3,
					content: []
				},{
					cost: function cost() {
						return this.content.length ? 1 : 0;
					},
					capacity: 3,
					content: []
				},{
					cost: function cost() {
						return this.content.length;
					},
					capacity: 5,
					content: []
				}
			),
			indiansmall: () => _.clone({
				cost: () => 0,
				capacity: 1,
				content: []
			}),
			indianbig: () => _.clone({
				cost: function cost() {
					return this.content.length ? 1 : 0;
				},
				capacity: 3,
				content: []
			}),
			supplysmall: () => _.clone({
				cost: () => 0,
				capacity: 2,
				content: []
			}),
			supplybig: () => _.clone({
				cost: function cost() {
					return this.content.length ? 1 : 0;
				},
				capacity: 5,
				content: []
			})
		};
	}
]);

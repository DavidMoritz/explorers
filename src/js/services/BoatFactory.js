mainApp.factory('BoatFactory', [
	function BoatFactory() {
		'use strict';

		return {
			startIndian: function startIndian() {
				return new Array({
					cost: function cost() {
						return 0;
					},
					capacity: 1,
					content: []
				},{
					cost: function cost() {
						return this.content.length;
					},
					capacity: 20,
					content: []
				});
			},
			startSupply: function startSupply() {
				return new Array({
					cost: function cost() {
						return 0;
					},
					capacity: 2,
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
				});
			},
			indiansmall: function smallIndian() {
				return {
					cost: function cost() {
						return 0;
					},
					capacity: 1,
					content: []
				};
			},
			indianbig: function bigIndian() {
				return {
					cost: function cost() {
						return this.content.length ? 1 : 0;
					},
					capacity: 3,
					content: []
				};
			},
			supplysmall: function smallSupply() {
				return {
					cost: function cost() {
						return 0;
					},
					capacity: 2,
					content: []
				};
			},
			supplybig: function bigSupply() {
				return {
					cost: function cost() {
						return this.content.length ? 1 : 0;
					},
					capacity: 5,
					content: []
				};
			}
		};
	}
]);

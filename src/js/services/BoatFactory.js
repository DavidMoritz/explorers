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
					cost: () => this.content.length,
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
					cost: () => this.content.length ? 1 : 0,
					capacity: 3,
					content: []
				},{
					cost: () => this.content.length,
					capacity: 5,
					content: []
				}
			),
			indiansmall: () => {
				return {
					cost: () => 0,
					capacity: 1,
					content: []
				};
			},
			indianbig: () => {
				return {
					cost: () => this.content.length ? 1 : 0,
					capacity: 3,
					content: []
				};
			},
			supplysmall: () => {
				return {
					cost: () => 0,
					capacity: 2,
					content: []
				};
			},
			supplybig: () => {
				return {
					cost: () => this.content.length ? 1 : 0,
					capacity: 5,
					content: []
				};
			}
		};
	}
]);

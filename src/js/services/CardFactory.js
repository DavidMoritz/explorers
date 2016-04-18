mainApp.factory('CardFactory', [
	function CardFactory() {
		'use strict';

		return {
			map: [
				{
					water: 5
				},
				{
					special: 'start',
					water: 1
				},
				{
					water: 17
				},
				{
					either: 1
				},
				{
					mountain: 7
				},
				{
					either: 1
				},
				{
					water: 5
				},
				{
					mountain: 3
				},
				{
					water: 4
				},
				{
					special: 'finish',
					water: 1
				},
				{
					water: 10
				}
			],
			boardSpaces: [
				{
					cost: {
						indian: 1
					},
					benefit: {
						meat: 1,
						fur: 1
					}
				},{
					cost: {
						indian: 1
					},
					benefit: {
						equipment: 1,
						wood: 1
					}
				},{
					cost: {
						indian: 1
					},
					benefit: {
						fur: 2
					}
				},{
					cost: {
						indian: 1
					},
					benefit: {
						wood: 2
					}
				},{
					cost: {
						indian: 1,
						wood: 2
					},
					benefit: {
						canoe: 1
					}
				},{
					cost: {
						indian: 1,
						wood: 1,
						meat: 1,
						fur: 1
					},
					benefit: {
						horse: 1
					}
				},{
					cost: {
						indian: 1,
						equipment: 1,
						meat: 1,
						fur: 1
					},
					benefit: {
						horse: 1
					}
				},{
					cost: {
						indian: 1,
						wood: 1,
						equipment: 1,
						fur: 1
					},
					benefit: {
						horse: 1
					}
				},{
					cost: {
						indian: 1,
						wood: 1,
						meat: 1,
						equipment: 1
					},
					benefit: {
						horse: 1
					}
				},{
					cost: {
						indian: 1,
						wood: 3
					},
					benefit: {
						indian: 1,
						boat: 'indian'
					}
				},{
					cost: {
						indian: 1,
						wood: 3
					},
					benefit: {
						indian: 1,
						boat: 'big indian'
					}
				},{
					cost: {
						indian: 1,
						wood: 3
					},
					benefit: {
						basic: 2,
						boat: 'supply'
					}
				},{
					cost: {
						indian: 1,
						wood: 3
					},
					benefit: {
						basic: 2,
						boat: 'big supply'
					}
				},{
					cost: {
						indian: 1
					},
					benefit: {
						trash: 3,
						journal: 'reset'
					}
				},{
					cost: {
						indian: 1,
						meat: 1
					},
					benefit: {
						ability: 'any'
					}
				}
			],
			startingCards: function startingCards() {
				return new Array({
					id: 'P11',
					name: 'Meriweather Lewis',
					symbol: 'fur',
					strength: 1,
					power: [{
						cost: {
							canoe: 1
						},
						benefit: {
							water: 4
						}
					}, {
						cost: {
							meat: 1
						},
						benefit: {
							water: 2
						}
					}, {
						cost: {
							horse: 1
						},
						benefit: {
							mountain: 2
						}
					}]
				}, {
					id: 'P12',
					name: 'Pierre Cruzatte',
					symbol: 'wood',
					strength: 2,
					power: [{
						benefit: {
							indian: 2
						}
					}]
				}, {
					id: 'P13',
					name: 'Seamor',
					symbol: 'meat',
					strength: 1,
					power: [{
						benefit: {
							meat: 2
						}
					}]
				}, {
					id: 'P14',
					name: 'Hugh McNeal',
					symbol: 'wood',
					strength: 1,
					power: [{
						benefit: {
							wood: 2
						}
					}]
				}, {
					id: 'P15',
					name: 'Alexander H. Willard',
					symbol: 'equipment',
					strength: 1,
					power: [{
						benefit: {
							equipment: 2
						}
					}]
				}, {
					id: 'P16',
					name: 'Richard Windsor',
					symbol: 'fur',
					strength: 1,
					power: [{
						benefit: {
							fur: 2
						}
					}]
				});
			},
			journalCards: [
				{
					id: 'F11',
					name: 'Joseph Barter',
					symbol: 'fur',
					strength: 1,
					power: [{
						cost: {
							canoe: 1
						},
						benefit: {
							water: 5
						}
					}]
				}, {
					id: 'F12',
					name: 'Ebenezer Tuttle',
					symbol: 'fur',
					strength: 1,
					power: [{
						cost: {
							wood: 1
						},
						benefit: {
							canoe: 1
						}
					}]
				}, {
					id: 'F13',
					name: 'Rene Jassaume',
					symbol: 'fur',
					strength: 1,
					power: [{
						cost: {
							fur: 3
						},
						benefit: {
							horse: 1
						}
					}]
				}, {
					id: 'F14',
					name: 'Moses B. Reed',
					symbol: 'fur',
					strength: 1,
					power: [{
						cost: {
							wood: 2
						},
						benefit: {
							water: 2
						}
					}]
				}, {
					id: 'F21',
					name: 'P. Antoine Tabeau',
					symbol: 'fur',
					strength: 2,
					power: [{
						cost: {
							wood: 1,
							meat: 1
						},
						benefit: {
							canoe: 2
						}
					}]
				}, {
					id: 'F22',
					name: 'Hawks Feather',
					symbol: 'fur',
					strength: 2,
					power: [{
						cost: {
							meat: 1
						},
						benefit: {
							water: 3
						}
					}]
				}, {
					id: 'F31',
					name: 'Coboway',
					symbol: 'fur',
					strength: 3,
					power: [{
						cost: {
							equipment: 1,
							fur: 1,
							meat: 1,
							wood: 1
						},
						benefit: {
							mountain: 4
						}
					}]
				}, {
					id: 'M11',
					name: 'J. Baptiste',
					symbol: 'meat',
					strength: 1,
					power: [{
						cost: {
							canoe: 1,
							meat: 1
						},
						benefit: {
							water: 6
						}
					}]
				}, {
					id: 'M31',
					name: 'Broken Arm',
					symbol: 'meat',
					strength: 3,
					power: [{
						cost: {
							equipment: 1
						},
						benefit: {
							horse: 1
						}
					}]
				}, {
					id: 'E11',
					name: 'Buffalo Medicine',
					symbol: 'equipment',
					strength: 1,
					power: [{
						cost: {
							meat: 1
						},
						benefit: {
							canoe: 1
						}
					}]
				}, {
					id: 'E12',
					name: 'John Dame',
					symbol: 'equipment',
					strength: 1,
					power: [{
						cost: {
							wood: 2
						},
						benefit: {
							mountain: 1
						}
					}]
				}, {
					id: 'E13',
					name: 'Charles Mackenzie',
					symbol: 'equipment',
					strength: 1,
					power: [{
						cost: {
							horse: 1,
							fur: 1
						},
						benefit: {
							mountain: 3
						}
					}]
				}, {
					id: 'E21',
					name: 'Pierre Dorian',
					symbol: 'equipment',
					strength: 2,
					power: [{
						cost: {
							fur: 3
						},
						benefit: {
							mountain: 2
						}
					}]
				}, {
					id: 'E31',
					name: 'Comcomly',
					symbol: 'equipment',
					strength: 3,
					power: [{
						cost: {
							equipment: 1,
							fur: 1,
							wood: 1,
							meat: 1
						},
						benefit: {
							water: 7
						}
					}]
				}, {
					id: 'E32',
					name: 'Crow At Rest',
					symbol: 'equipment',
					strength: 3,
					power: [{
						cost: {
							equipment: 2,
							fur: 2
						},
						benefit: {
							mountain: 3
						}
					}]
				}, {
					id: 'W11',
					name: 'John Robertson',
					symbol: 'wood',
					strength: 1,
					power: [{
						cost: {
							equipment: 2
						},
						benefit: {
							water: 3
						}
					}]
				}, {
					id: 'W21',
					name: 'Three Eagles',
					symbol: 'wood',
					strength: 2,
					power: [{
						cost: {
							equipment: 2
						},
						benefit: {
							horse: 1
						}
					}]
				}, {
					id: 'W22',
					name: 'Man Crow',
					symbol: 'wood',
					strength: 2,
					power: [{
						cost: {
							wood: 3
						},
						benefit: {
							water: 4
						}
					}]
				}, {
					id: 'W31',
					name: 'Twisted Hair',
					symbol: 'wood',
					strength: 3,
					power: [{
						cost: {
							canoe: 1
						},
						benefit: {
							canoe: 2
						}
					}]
				}
			]
		};
	}
]);
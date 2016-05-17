mainApp.factory('CardFactory', [
	function CardFactory() {
		'use strict';

		return {
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
						abilities: 'any'
					}
				}
			],
			startingCards: () => new Array(
				{
					id: 'SP11',
					name: 'Meriweather Lewis',
					symbol: 'fur',
					description: 'travel 2 water for 1 food / travel 4 water for 1 canoe / travel 2 mountain for 1 horse.',
					strength: 1,
					played: false,
					plays: 0,
					abilities: [{
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
					id: 'SP12',
					name: 'Pierre Cruzatte',
					symbol: 'wood',
					description: 'gather indians from the board and trash last card in journal.',
					strength: 2,
					played: false,
					plays: 0,
					abilities: [{
						benefit: {
							indian: 2
						}
					}]
				}, {
					id: 'SP13',
					name: 'Seamor',
					symbol: 'meat',
					description: 'collect action on food.',
					strength: 1,
					played: false,
					plays: 0,
					abilities: [{
						benefit: {
							meat: 2
						}
					}]
				}, {
					id: 'SP14',
					name: 'Hugh McNeal',
					symbol: 'wood',
					description: 'collect action on wood.',
					strength: 1,
					played: false,
					plays: 0,
					abilities: [{
						benefit: {
							wood: 2
						}
					}]
				}, {
					id: 'SP15',
					name: 'Alexander H. Willard',
					symbol: 'equipment',
					description: 'collect action on equipment.',
					strength: 1,
					played: false,
					plays: 0,
					abilities: [{
						benefit: {
							equipment: 2
						}
					}]
				}, {
					id: 'SP16',
					name: 'Richard Windsor',
					symbol: 'fur',
					description: 'collect action on fur.',
					strength: 1,
					played: false,
					plays: 0,
					abilities: [{
						benefit: {
							fur: 2
						}
					}]
				}
			),
			journalCards: [
				{
					id: 'JF11',
					name: 'Joseph Barter',
					symbol: 'fur',
					description: 'travel 5 water for 1 canoe.',
					strength: 1,
					abilities: [{
						cost: {
							canoe: 1
						},
						benefit: {
							water: 5
						}
					}]
				}, {
					id: 'JF12',
					name: 'Ebenezer Tuttle',
					symbol: 'fur',
					description: 'receive 1 canoe for 1 wood / receive 1 wood for 1 canoe.',
					strength: 1,
					abilities: [{
						cost: {
							wood: 1
						},
						benefit: {
							canoe: 1
						}
					},{
						cost: {
							canoe: 1
						},
						benefit: {
							wood: 1
						}
					}]
				}, {
					id: 'JF13',
					name: 'Rene Jassaume',
					symbol: 'fur',
					description: 'receive 1 horse for 3 fur.',
					strength: 1,
					abilities: [{
						cost: {
							fur: 3
						},
						benefit: {
							horse: 1
						}
					}]
				}, {
					id: 'JF14',
					name: 'Moses B. Reed',
					symbol: 'fur',
					description: 'travel 2 water for 2 wood.',
					strength: 1,
					abilities: [{
						cost: {
							wood: 2
						},
						benefit: {
							water: 2
						}
					}]
				}, {
					id: 'JF21',
					name: 'P. Antoine Tabeau',
					symbol: 'fur',
					description: 'receive 2 canoes for 1 food and 1 wood.',
					strength: 2,
					abilities: [{
						cost: {
							wood: 1,
							meat: 1
						},
						benefit: {
							canoe: 2
						}
					}]
				}, {
					id: 'JF22',
					name: 'Hawks Feather',
					symbol: 'fur',
					description: 'travel 3 water for 1 food.',
					strength: 2,
					abilities: [{
						cost: {
							meat: 1
						},
						benefit: {
							water: 3
						}
					}]
				}, {
					id: 'JF31',
					name: 'Coboway',
					symbol: 'fur',
					description: 'travel 4 mountain for 1 equipment, 1 fur, 1 food, and 1 wood.',
					strength: 3,
					abilities: [{
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
					id: 'JH11',
					name: 'J. Baptiste',
					symbol: 'meat',
					description: 'travel 6 water for 1 canoe and 1 food.',
					strength: 1,
					abilities: [{
						cost: {
							canoe: 1,
							meat: 1
						},
						benefit: {
							water: 6
						}
					}]
				}, {
					id: 'JH31',
					name: 'Broken Arm',
					symbol: 'meat',
					description: 'receive 1 horse for 1 equipment.',
					strength: 3,
					abilities: [{
						cost: {
							equipment: 1
						},
						benefit: {
							horse: 1
						}
					}]
				}, {
					id: 'JE11',
					name: 'Buffalo Medicine',
					symbol: 'equipment',
					description: 'receive 1 canoe for 1 food.',
					strength: 1,
					abilities: [{
						cost: {
							meat: 1
						},
						benefit: {
							canoe: 1
						}
					}]
				}, {
					id: 'JE12',
					name: 'John Dame',
					symbol: 'equipment',
					description: 'travel 1 mountain for 2 wood.',
					strength: 1,
					abilities: [{
						cost: {
							wood: 2
						},
						benefit: {
							mountain: 1
						}
					}]
				}, {
					id: 'JE13',
					name: 'Charles Mackenzie',
					symbol: 'equipment',
					description: 'travel 3 mountain for 1 horse and 1 fur.',
					strength: 1,
					abilities: [{
						cost: {
							horse: 1,
							fur: 1
						},
						benefit: {
							mountain: 3
						}
					}]
				}, {
					id: 'JE21',
					name: 'Pierre Dorian',
					symbol: 'equipment',
					description: 'travel 2 mountain for 3 fur.',
					strength: 2,
					abilities: [{
						cost: {
							fur: 3
						},
						benefit: {
							mountain: 2
						}
					}]
				}, {
					id: 'JE31',
					name: 'Comcomly',
					symbol: 'equipment',
					description: 'travel 7 water for 1 equipment, 1 fur, 1 food, and 1 wood.',
					strength: 3,
					abilities: [{
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
					id: 'JE32',
					name: 'Crow At Rest',
					symbol: 'equipment',
					description: 'travel 3 mountain for 2 equipment and 2 fur.',
					strength: 3,
					abilities: [{
						cost: {
							equipment: 2,
							fur: 2
						},
						benefit: {
							mountain: 3
						}
					}]
				}, {
					id: 'JG11',
					name: 'John Robertson',
					symbol: 'wood',
					description: 'travel 3 water for 2 equipment.',
					strength: 1,
					abilities: [{
						cost: {
							equipment: 2
						},
						benefit: {
							water: 3
						}
					}]
				}, {
					id: 'JG21',
					name: 'Three Eagles',
					symbol: 'wood',
					description: 'receive 1 horse for 2 equipment.',
					strength: 2,
					abilities: [{
						cost: {
							equipment: 2
						},
						benefit: {
							horse: 1
						}
					}]
				}, {
					id: 'JG22',
					name: 'Man Crow',
					symbol: 'wood',
					description: 'travel 4 water for 3 wood.',
					strength: 2,
					abilities: [{
						cost: {
							wood: 3
						},
						benefit: {
							water: 4
						}
					}]
				}, {
					id: 'JG31',
					name: 'Twisted Hair',
					symbol: 'wood',
					description: 'receive 2 canoes for 1 canoe.',
					strength: 3,
					abilities: [{
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
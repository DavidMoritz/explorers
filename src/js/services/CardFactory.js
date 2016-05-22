mainApp.factory('CardFactory', [
	function CardFactory() {
		'use strict';

		return {
			boardSpaces: [
				{
					event: 'boardCollectMeatFur',
					description: 'Collect 1 food and 1 fur'
				},{
					event: 'boardCollectEquipmentWood',
					description: 'Collect 1 equipment and 1 wood'
				},{
					event: 'boardCollectChoice',
					description: 'Collect 2 fur or 2 wood'
				},{
					event: 'boardCollectCanoe',
					max: 20,
					allow: 3,
					description: 'Collect 1 canoe for 2 wood'
				},{
					event: 'boardCollectHorse',
					max: 20,
					allow: 3,
					description: 'Collect 1 horse for 3 different items'
				},{
					event: 'boardCollectBoat',
					max: 2,
					description: 'Collect 1 boat for 3 wood. 4 possible boats. Small Supply: 2 slots free. Big Supply: 5 slots for 1 day. Small Indian: 1 slot free. Big Indian: 3 slots for 1 day.'
				},{
					event: 'boardResetJournal',
					description: 'Remove all recruit cards from journal. May trash up to 3 cards from hand.'
				},{
					event: 'boardUseAbility',
					description: 'For 1 food, use any ability of a played card in front of any player. The action may only be executed once.'
				}
			],
			startingCards: _ => new Array(
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
						short: 'travel 4 water for 1 canoe',
						benefit: {
							water: 4
						}
					}, {
						cost: {
							meat: 1
						},
						short: 'travel 2 water for 1 food',
						benefit: {
							water: 2
						}
					}, {
						cost: {
							horse: 1
						},
						short: 'travel 2 mountain for 1 horse',
						benefit: {
							mountain: 2
						}
					}]
				}, {
					id: 'SP12',
					name: 'Pierre Cruzatte',
					symbol: 'wood',
					description: 'gather indians from the board and trash first card in journal.',
					strength: 2,
					played: false,
					plays: 0,
					abilities: [{
						short: 'gather indians from the board and trash first card in journal.',
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
						collect: 'meat',
						short: 'collect action on food.',
						benefit: {}
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
						collect: 'wood',
						short: 'collect action on wood.',
						benefit: {}
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
						collect: 'equipment',
						short: 'collect action on equipment.',
						benefit: {}
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
						collect: 'fur',
						short: 'collect action on fur.',
						benefit: {}
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
						short: 'travel 5 water for 1 canoe.',
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
						short: 'receive 1 canoe for 1 wood',
						benefit: {
							canoe: 1
						}
					},{
						cost: {
							canoe: 1
						},
						short: 'receive 1 wood for 1 canoe',
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
						short: 'receive 1 horse for 3 fur.',
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
						short: 'travel 2 water for 2 wood.',
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
						short: 'receive 2 canoes for 1 food and 1 wood.',
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
						short: 'travel 3 water for 1 food.',
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
						short: 'travel 4 mountain for 1 equipment, 1 fur, 1 food, and 1 wood.',
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
						short: 'travel 6 water for 1 canoe and 1 food.',
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
						short: 'receive 1 horse for 1 equipment.',
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
						short: 'receive 1 canoe for 1 food.',
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
						short: 'travel 4 mountain for 1 equipment, 1 fur, 1 food, and 1 wood.',
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
						short: 'travel 6 water for 1 canoe and 1 food.',
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
						short: 'receive 1 horse for 1 equipment.',
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
						short: 'receive 1 canoe for 1 food.',
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
						short: 'travel 3 mountain for 2 equipment and 2 fur.',
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
						short: 'travel 3 water for 2 equipment.',
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
						short: 'receive 1 horse for 2 equipment.',
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
						short: 'travel 4 water for 3 wood.',
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
						short: 'receive 2 canoes for 1 canoe.',
						benefit: {
							canoe: 2
						}
					}]
				}
			]
		};
	}
]);
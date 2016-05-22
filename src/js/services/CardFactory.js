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
					id: 'JF04',
					name: 'Ebenezer Tuttle',
					symbol: 'fur',
					description: 'Pay 1 Wood and take 1 Canoe.',
					story: 'Private, recruited for the first part of the expedition up to Fort Mandan. He is sent back to Saint Louis with Pierre Chouteau’s party of fur traders.',
					strength: 1,
					abilities: [{
						cost: {
							wood: 1
						},
						short: 'receive 1 canoe for 1 wood',
						benefit: {
							canoe: 1
						}
					}]
				}, {
					id: 'JF05',
					name: 'Rene Jassaume',
					symbol: 'fur',
					description: 'Pay 3 Furs and take 1 Horse.',
					story: 'He lived with his Indian wife and children in the Mandan chief ’s village. He helps the captains by providing them with information about the various chiefs and tribal politics.',
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
					id: 'JF07',
					name: 'Moses B. Reed',
					symbol: 'fur',
					description: 'Pay 2 Wood and move your Scout 2 spaces forward on the River.',
					story: 'Private, discharged from the Corps for having deserted and stolen weapons.',
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
					id: 'JF19',
					name: 'John Hay',
					symbol: 'fur',
					description: 'For each Strength that activates this card, choose one of the two resources: Fur or Wood, and collect it. (By activating this card three times, you can, for instance, collect Fur twice and Wood once.)',
					story: 'As a merchant, fur trader, and Cahokia’s post- master, he provides information. Since he speaks French and English, he helps as an interpreter.',
					strength: 2,
					abilities: [{
						collect: 'fur',
						short: 'collect action on fur.',
						benefit: {}
					},{
						collect: 'wood',
						short: 'collect action on wood.',
						benefit: {}
					}]
				}, {
					id: 'JF22',
					name: 'Black Moccasin',
					symbol: 'fur',
					description: 'For each Strength that activates this card, choose one of the two resources: Equipment or Food, and collect it. (By activating this card three times, you can, for instance, collect Equipment twice and Food once.)',
					story: 'Minitari chief, he captured Sacagawea from the Shoshone a few years earlier.',
					strength: 2,
					abilities: [{
						collect: 'equipment',
						short: 'collect action on equipment.',
						benefit: {}
					},{
						collect: 'meat',
						short: 'collect action on food.',
						benefit: {}
					}]
				}, {
					id: 'JF26',
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
					id: 'JH10',
					name: 'J. Baptiste Deschamps',
					symbol: 'meat',
					description: 'Pay 1 Food and 1 Canoe and move your Scout 6 spaces forward on the River.',
					story: 'As a French boatman, he is appointed foreman of the French boatmen in the red pirogue. He is among the men who, in April, 1805, navigate the keelboat downriver to St. Louis.',
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
					id: 'JG11',
					name: 'John Newman',
					symbol: 'wood',
					story: 'Recruited at Fort Massac, he is expelled from the expedition following his court-martial for «having uttered repeated expressions of a highly criminal and mutinous nature.',
					description: 'Pay 1 Food and move your Scout 1 space forward on the River or in the Mountains.',
					strength: 1,
					abilities: [{
						cost: {
							meat: 1
						},
						short: 'travel 1 water for 1 food.',
						benefit: {
							water: 1
						}
					},{
						cost: {
							meat: 1
						},
						short: 'travel 1 mountain for 1 food.',
						benefit: {
							mountain: 1
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
					id: 'JH21',
					name: 'Dickson & Hancock',
					symbol: 'meat',
					description: 'For each Strength that activates this card, choose one of the two resources: Food or Fur, and collect it. (By activating this card three times, you can, for instance, collect Food twice and Fur once.)',
					story: 'Fur trappers, they meet the expedition in September,1806, during its return to Washington. They invite John Colter to join them as a trapper.',
					strength: 2,
					abilities: [{
						collect: 'meat',
						short: 'collect action on food.',
						benefit: {}
					},{
						collect: 'fur',
						short: 'collect action on fur.',
						benefit: {}
					}]
				}, {
					id: 'JE03',
					name: 'Buffalo Medicine',
					symbol: 'equipment',
					description: 'Pay 1 Food and take 1 Canoe.',
					story: 'Teton Sioux third chief, involved in a power struggle. He meets the Expedition on the Bad River in September, 1804.',
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
					id: 'JE13',
					name: 'John Dame',
					symbol: 'equipment',
					description: 'Pay 2 Wood and move your Scout 1 space forward in the Mountains.',
					story: 'Aged 19, fair-haired and blue-eyed, he joins the Corps for the 1rst part of the journey and comes back to Saint Louis in the spring of 1805. He has shot a white pelican.',
					strength: 1,
					abilities: [{
						cost: {
							wood: 2
						},
						short: 'travel 1 mountain for 2 wood.',
						benefit: {
							mountain: 1
						}
					}]
				}, {
					id: 'JE12',
					name: 'Charles Mackenzie',
					symbol: 'equipment',
					description: 'Pay 1 Fur and 1 Horse and move your Scout 3 spaces forward in the Mountains.',
					story: 'Fur trader, he works for the North West Company. Along with Larocque, he is a frequent visitor to Fort Mandan during the winter of 1804-1805.',
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
					id: 'JF20',
					name: 'Big White',
					symbol: 'equipment',
					description: 'For each Strength that activates this card, choose one of the two resources: Equipment or Wood. Then collect it. (By activating this card three times, you can, for instance, collect Equipment twice and Wood once.)',
					story: 'He is the principal chief of the lower Mandan village, nicknamed this way because of his size and complexion. He meets President Jefferson in Washington after the expedition',
					strength: 2,
					abilities: [{
						collect: 'equipment',
						short: 'collect action on equipment.',
						benefit: {}
					},{
						collect: 'fur',
						short: 'collect action on fur.',
						benefit: {}
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
					id: 'JG08',
					name: 'John Robertson',
					symbol: 'wood',
					description: 'Pay 2 Equipment and move your Scout 3 spaces forward on the River.',
					story: 'Initially a corporal, Clark demotes him for having «no authority» over his men and failing to stop a fight at Camp Dubois. He’s probably the first man to leave the expedition.',
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
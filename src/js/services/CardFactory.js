mainApp.factory('CardFactory', [
	function CardFactory() {
		'use strict';

		return {
			boardSpaces: [
				{
					event: 'boardCollectMeatFur',
					class: 'right',
					max: 1,
					description: 'Collect 1 food and 1 fur'
				},{
					event: 'boardCollectEquipmentWood',
					max: 1,
					description: 'Collect 1 equipment and 1 wood'
				},{
					event: 'boardCollectChoice',
					class: 'left',
					max: 1,
					description: 'Collect 2 fur or 2 wood'
				},{
					event: 'boardCollectCanoe',
					class: 'left',
					max: 20,
					allow: 3,
					description: 'Collect 1 canoe for 2 wood. May be used 3 times.'
				},{
					event: 'boardPowWow',
					class: 'center',
					max: 0,
					description: 'Indians dance the pow-wow here'
				},{
					event: 'boardResetJournal',
					class: 'right',
					max: 1,
					description: 'Remove all recruit cards from journal. May trash up to 3 cards from hand.'
				},{
					event: 'boardCollectHorse',
					class: 'center',
					max: 20,
					allow: 3,
					description: 'Collect 1 horse for 3 different items. May be used 3 times.'
				},{
					event: 'boardUseAbility',
					max: 1,
					description: 'For 1 food, use any ability of a played card in front of any player. The action may only be executed once.'
				},{
					event: 'boardCollectBoat',
					class: 'center',
					max: 2,
					description: 'Collect 1 boat for 3 wood. 4 possible boats. Small Supply: 2 slots free. Big Supply: 5 slots for 1 day. Small Indian: 1 slot free. Big Indian: 3 slots for 1 day.'
				}
			],
			lightblue: [
				{
					id: 'SP11',
					name: 'Meriweather Lewis',
					symbol: 'fur',
					description: 'travel 2 river for 1 food / travel 4 river for 1 canoe / travel 2 mountain for 1 horse.',
					strength: 1,
					played: false,
					plays: 0,
					abilities: [{
						cost: {
							canoe: 1
						},
						short: 'travel 4 river for 1 canoe',
						benefit: {
							river: 4
						}
					}, {
						cost: {
							meat: 1
						},
						short: 'travel 2 river for 1 food',
						benefit: {
							river: 2
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
						event: 'interpreter'
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
			],
			lightsalmon: [
				{
					id: 'SP21',
					name: 'William Clark',
					symbol: 'fur',
					description: 'travel 2 river for 1 food / travel 4 river for 1 canoe / travel 2 mountain for 1 horse.',
					strength: 1,
					played: false,
					plays: 0,
					abilities: [{
						cost: {
							canoe: 1
						},
						short: 'travel 4 river for 1 canoe',
						benefit: {
							river: 4
						}
					}, {
						cost: {
							meat: 1
						},
						short: 'travel 2 river for 1 food',
						benefit: {
							river: 2
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
					id: 'SP22',
					name: 'François Labiche',
					symbol: 'wood',
					description: 'gather indians from the board and trash first card in journal.',
					strength: 2,
					played: false,
					plays: 0,
					abilities: [{
						short: 'gather indians from the board and trash first card in journal.',
						event: 'interpreter'
					}]
				}, {
					id: 'SP23',
					name: 'York',
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
					id: 'SP24',
					name: 'John B. Thompson',
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
					id: 'SP25',
					name: 'Joseph Whitehouse',
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
					id: 'SP26',
					name: 'Joseph & Ruben Field',
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
			],
			lightgreen: [
				{
					id: 'SP31',
					name: 'Nathaniel Pryor',
					symbol: 'fur',
					description: 'travel 2 river for 1 food / travel 4 river for 1 canoe / travel 2 mountain for 1 horse.',
					strength: 1,
					played: false,
					plays: 0,
					abilities: [{
						cost: {
							canoe: 1
						},
						short: 'travel 4 river for 1 canoe',
						benefit: {
							river: 4
						}
					}, {
						cost: {
							meat: 1
						},
						short: 'travel 2 river for 1 food',
						benefit: {
							river: 2
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
					id: 'SP32',
					name: 'George Gibson',
					symbol: 'wood',
					description: 'gather indians from the board and trash first card in journal.',
					strength: 2,
					played: false,
					plays: 0,
					abilities: [{
						short: 'gather indians from the board and trash first card in journal.',
						event: 'interpreter'
					}]
				}, {
					id: 'SP34',
					name: 'Patrick Gass',
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
					id: 'SP33',
					name: 'John Colter',
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
					id: 'SP35',
					name: 'William Bratton',
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
					id: 'SP36',
					name: 'Peter Weiser',
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
			],
			orchid: [
				{
					id: 'SP41',
					name: 'Charles Floyd',
					symbol: 'fur',
					description: 'travel 2 river for 1 food / travel 4 river for 1 canoe / travel 2 mountain for 1 horse.',
					strength: 1,
					played: false,
					plays: 0,
					abilities: [{
						cost: {
							canoe: 1
						},
						short: 'travel 4 river for 1 canoe',
						benefit: {
							river: 4
						}
					}, {
						cost: {
							meat: 1
						},
						short: 'travel 2 river for 1 food',
						benefit: {
							river: 2
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
					id: 'SP42',
					name: 'J. Baptiste Lepage',
					symbol: 'wood',
					description: 'gather indians from the board and trash first card in journal.',
					strength: 2,
					played: false,
					plays: 0,
					abilities: [{
						short: 'gather indians from the board and trash first card in journal.',
						event: 'interpreter'
					}]
				}, {
					id: 'SP43',
					name: 'William Werner',
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
					id: 'SP44',
					name: 'Hugh Hall',
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
					id: 'SP45',
					name: 'John Potts',
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
					id: 'SP46',
					name: 'John Collins',
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
			],
			khaki: [
				{
					id: 'SP51',
					name: 'John Ordway',
					symbol: 'fur',
					description: 'travel 2 river for 1 food / travel 4 river for 1 canoe / travel 2 mountain for 1 horse.',
					strength: 1,
					played: false,
					plays: 0,
					abilities: [{
						cost: {
							canoe: 1
						},
						short: 'travel 4 river for 1 canoe',
						benefit: {
							river: 4
						}
					}, {
						cost: {
							meat: 1
						},
						short: 'travel 2 river for 1 food',
						benefit: {
							river: 2
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
					id: 'SP52',
					name: 'Robert Frazer',
					symbol: 'wood',
					description: 'gather indians from the board and trash first card in journal.',
					strength: 2,
					played: false,
					plays: 0,
					abilities: [{
						short: 'gather indians from the board and trash first card in journal.',
						event: 'interpreter'
					}]
				}, {
					id: 'SP53',
					name: 'Silas Goodrich',
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
					id: 'SP54',
					name: 'Thomas P. Howard',
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
					id: 'SP55',
					name: 'John Shields',
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
					id: 'SP56',
					name: 'George Shannon',
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
			],
			journalCards: [
				{
					id: 'JF09',
					name: 'Joseph Barter',
					symbol: 'fur',
					description: 'travel 5 river for 1 canoe.',
					strength: 1,
					abilities: [{
						cost: {
							canoe: 1
						},
						short: 'travel 5 river for 1 canoe.',
						benefit: {
							river: 5
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
					name: 'René Jessaume',
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
						short: 'travel 2 river for 2 wood.',
						benefit: {
							river: 2
						}
					}]
				}, {
					id: 'JF24',
					name: 'P. Antoine Tabeau',
					symbol: 'fur',
					description: 'Pay 1 Wood and 1 Food and take 2 Canoes.',
					story: 'French-Canadian fur-trader and explorer; provides useful information about Arikara Indian tribes.',
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
					name: 'Hawk\'s Feather',
					symbol: 'fur',
					description: 'Pay 1 Food and move your Scout 3 spaces forward on the River.',
					story: 'Arikara chief, agrees to attempt peace with the Mandan.',
					strength: 2,
					abilities: [{
						cost: {
							meat: 1
						},
						short: 'travel 3 river for 1 food.',
						benefit: {
							river: 3
						}
					}]
				}, {
					id: 'JF48',
					name: 'Coboway',
					symbol: 'fur',
					description: 'Pay 1 Equipment, 1 Food, 1 Fur and 1 Wood and move your Scout 4 spaces forward in the Mountains.',
					story: 'He is the only Clatsop leader to make recorded contact with the Expedition. He exchanges some goods, including a sea otter pelt, for fish hooks and a small bag of Shoshone tobacco.',
					strength: 3,
					abilities: [{
						cost: {
							equipment: 1,
							fur: 1,
							meat: 1,
							wood: 1
						},
						short: 'travel 4 mountain for 1 of each basic.',
						benefit: {
							mountain: 4
						}
					}]
				}, {
					id: 'JF47',
					name: 'Old Toby',
					symbol: 'fur',
					description: 'Pay 1 Canoe and 1 Horse and move your Scout 6 spaces forward, either on the River or in the Mountains; not both! If activated more than once, each multiple of 6 can be either River or Mountains.',
					story: 'Shoshone guide, he is sent by Cameahwait to lead the Expedition across the Rockies. He guides Clark’s exploration of the Salmon River.',
					strength: 3,
					abilities: [{
						cost: {
							canoe: 1,
							horse: 1
						},
						short: 'travel 6 river for 1 canoe, and 1 horse.',
						benefit: {
							river: 6
						}
					},{
						cost: {
							canoe: 1,
							horse: 1
						},
						short: 'travel 6 mountain for 1 canoe, and 1 horse.',
						benefit: {
							mountain: 6
						}
					}]
				}, {
					id: 'JF41',
					name: 'Cameahwait',
					symbol: 'fur',
					description: 'Pay 1 Canoe and take 1 Horse or pay 1 Horse and take 1 Canoe.',
					story: 'Shoshone chief, he is Sacagawea’s brother. He provides Lewis and Clark hospitality and horses to repay them for reuniting him with his long-lost sister.',
					strength: 3,
					abilities: [{
						cost: {
							canoe: 1
						},
						short: 'receive 1 horse for 1 canoe',
						benefit: {
							horse: 1
						}
					},{
						cost: {
							horse: 1
						},
						short: 'receive 1 canoe for 1 horse',
						benefit: {
							canoe: 1
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
						short: 'travel 6 river for 1 canoe and 1 food.',
						benefit: {
							river: 6
						}
					}]
				}, {
					id: 'JG11',
					name: 'John Newman',
					symbol: 'wood',
					story: 'Recruited at Fort Massac, he is expelled from the expedition following his court-martial for (having uttered repeated expressions of a highly criminal and mutinous nature.',
					description: 'Pay 1 Food and move your Scout 1 space forward on the River or in the Mountains.',
					strength: 1,
					abilities: [{
						cost: {
							meat: 1
						},
						short: 'travel 1 river for 1 food.',
						benefit: {
							river: 1
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
					id: 'JH42',
					name: 'Broken Arm',
					symbol: 'meat',
					description: 'Pay 1 Equipment and take 1 Horse.',
					stroy: 'Nez Perce chief. Honest and generous, he gives the Corps horses and desires to make peace with the Shoshone.',
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
					id: 'JH32',
					name: 'James Mackay',
					symbol: 'meat',
					description: 'Pay 1 Horse and move your Scout forward 3 spaces, either on the River or in the Mountains; not both! If activated more than once, each multiple of 3 can be either River or Mountains.',
					story: 'Fur trader, explorer, Scotsman, (perhaps the most widely travelled of the many traders met), he is the creator of the most complete Missouri River map used by Lewis & Clark.',
					strength: 2,
					abilities: [{
						cost: {
							horse: 1
						},
						short: 'travel 3 mountain for 1 horse',
						benefit: {
							mountain: 3
						}
					},{
						cost: {
							horse: 1
						},
						short: 'travel 3 river for 1 horse',
						benefit: {
							river: 3
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
					id: 'JH38',
					name: 'Hugh Heney',
					symbol: 'meat',
					description: 'For each Strength that activates this card, choose one of the three resources: Fur, Food or Wood. Then collect it. (By activating this card three times, you can, for instance, collect Fur once, Food once and Wood once.)',
					story: 'Canadian fur trader, a «very sensible, intelligent man», he knows the Teton Sioux like no other white man. Heney sends some snakebite medicine to Lewis & Clark.',
					strength: 3,
					abilities: [{
						collect: 'fur',
						short: 'collect action on fur.',
						benefit: {}
					},{
						collect: 'meat',
						short: 'collect action on food.',
						benefit: {}
					},{
						collect: 'wood',
						short: 'collect action on wood.',
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
						short: 'travel 6 river for 1 canoe and 1 food.',
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
					id: 'JE34',
					name: 'Pierre Dorion',
					symbol: 'equipment',
					description: 'Pay 3 Furs and move your Scout forward 2 spaces in the Mountains.',
					story: 'Married to a Yankton woman, he joins the expedition as an interpreter. In April 1805, he is sent back to St.Louis with chiefs of the Yankton, Omaha, Oto & Missouri tribes.',
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
					id: 'JE43',
					name: 'Comcomly',
					symbol: 'equipment',
					description: 'Pay 1 Equipment, 1 Food, 1 Fur and 1 Wood and move your Scout 7 spaces forward on the River.',
					story: 'Chinook chief, most powerful leader at the mouth of the Columbia, he is described as «a shrewd old savage with but one eye». He is friendly to the white explorers.',
					strength: 3,
					abilities: [{
						cost: {
							equipment: 1,
							fur: 1,
							wood: 1,
							meat: 1
						},
						short: 'travel 7 river for 1 of each basic',
						benefit: {
							river: 7
						}
					}]
				}, {
					id: 'JE37',
					name: 'Régis Loisel',
					symbol: 'equipment',
					description: 'For each Strength that activates this card, choose one of the three resources: Equipment, Food or Wood. Then collect it. (By activating this card three times, you can, for instance, collect Equipment once, Food once and Wood once.)',
					story: 'French-Canadian fur trader and explorer at La Charette, on the Missouri River.',
					strength: 3,
					abilities: [{
						collect: 'equipment',
						short: 'collect action on equipment.',
						benefit: {}
					},{
						collect: 'meat',
						short: 'collect action on food.',
						benefit: {}
					},{
						collect: 'wood',
						short: 'collect action on wood.',
						benefit: {}
					}]
				}, {
					id: 'JE49',
					name: 'Crow At Rest',
					symbol: 'equipment',
					description: 'Pay 2 Furs and 2 Equipment and move your Scout 3 spaces forward in the Mountains.',
					story: 'Grand Arikara chief, he is interested in trading buffalo skin. He assures the Corps that the Arikara would let them travel on in safety and that peace with the Mandan is desirable.',
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
					story: 'Initially a corporal, Clark demotes him for having (no authority) over his men and failing to stop a fight at Camp Dubois. He’s probably the first man to leave the expedition.',
					strength: 1,
					abilities: [{
						cost: {
							equipment: 2
						},
						short: 'travel 3 river for 2 equipment.',
						benefit: {
							river: 3
						}
					}]
				}, {
					id: 'JG25',
					name: 'Three Eagles',
					symbol: 'wood',
					description: 'Pay 2 Equipment and take 1 Horse.',
					story: 'Flathead chief, he meets the party in September, 1805, and welcomes, feeds, and swaps horses with the Corps of Discovery.',
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
					id: 'JG27',
					name: 'Man Crow',
					symbol: 'wood',
					description: 'Pay 3 Wood and move your Scout 4 spaces forward on the River.',
					story: 'Arikara chief, challenger to Crow at Rest’s civil authority',
					strength: 2,
					abilities: [{
						cost: {
							wood: 3
						},
						short: 'travel 4 river for 3 wood.',
						benefit: {
							river: 4
						}
					}]
				}, {
					id: 'JG40',
					name: 'Twisted Hair',
					symbol: 'wood',
					description: 'Pay 1 Canoe and take 2 Canoes. If you activate this Character several times, you are not allowed to use the resources you get as a result of the first (or second) activation to trigger the next Action. You must use Canoes that had been previously held.',
					story: 'Nez Perce chief, a «cheerful man with apparent sincerity», helps build dugout canoes',
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
mainApp.factory('CardFactory', [
	function CardFactory() {
		'use strict';

		return {
			journalCards: [
				{
					id: 'F11',
					name: 'Joseph Barter',
					symbol: 'fur',
					strength: 1,
					power: {
						cost: {
							canoe: 1
						},
						benefit: {
							water: 5
						}
					}
				}, {
					id: 'F12',
					name: 'Ebenezer Tuttle',
					symbol: 'fur',
					strength: 1,
					power: {
						cost: {
							wood: 1
						},
						benefit: {
							canoe: 1
						}
					}
				}, {
					id: 'F13',
					name: 'Rene Jassaume',
					symbol: 'fur',
					strength: 1,
					power: {
						cost: {
							fur: 3
						},
						benefit: {
							horse: 1
						}
					}
				}, {
					id: 'F14',
					name: 'Moses B. Reed',
					symbol: 'fur',
					strength: 1,
					power: {
						cost: {
							wood: 2
						},
						benefit: {
							water: 2
						}
					}
				}, {
					id: 'F21',
					name: 'P. Antoine Tabeau',
					symbol: 'fur',
					strength: 2,
					power: {
						cost: {
							wood: 1,
							meat: 1
						},
						benefit: {
							canoe: 2
						}
					}
				}, {
					id: 'F22',
					name: 'Hawks Feather',
					symbol: 'fur',
					strength: 2,
					power: {
						cost: {
							meat: 1
						},
						benefit: {
							water: 3
						}
					}
				}, {
					id: 'F31',
					name: 'Coboway',
					symbol: 'fur',
					strength: 3,
					power: {
						cost: {
							supplies: 1,
							fur: 1,
							meat: 1,
							wood: 1
						},
						benefit: {
							mountain: 4
						}
					}
				}, {
					id: 'M11',
					name: 'J. Baptiste',
					symbol: 'meat',
					strength: 1,
					power: {
						cost: {
							canoe: 1,
							meat: 1
						},
						benefit: {
							water: 6
						}
					}
				}, {
					id: 'M31',
					name: 'Broken Arm',
					symbol: 'meat',
					strength: 3,
					power: {
						cost: {
							supplies: 1
						},
						benefit: {
							horse: 1
						}
					}
				}, {
					id: 'S11',
					name: 'Buffalo Medicine',
					symbol: 'supplies',
					strength: 1,
					power: {
						cost: {
							meat: 1
						},
						benefit: {
							canoe: 1
						}
					}
				}, {
					id: 'S12',
					name: 'John Dame',
					symbol: 'supplies',
					strength: 1,
					power: {
						cost: {
							wood: 2
						},
						benefit: {
							mountain: 1
						}
					}
				}, {
					id: 'S13',
					name: 'Charles Mackenzie',
					symbol: 'supplies',
					strength: 1,
					power: {
						cost: {
							horse: 1,
							fur: 1
						},
						benefit: {
							mountain: 3
						}
					}
				}, {
					id: 'S21',
					name: 'Pierre Dorian',
					symbol: 'supplies',
					strength: 2,
					power: {
						cost: {
							fur: 3
						},
						benefit: {
							mountain: 2
						}
					}
				}, {
					id: 'S31',
					name: 'Comcomly',
					symbol: 'supplies',
					strength: 3,
					power: {
						cost: {
							supplies: 1,
							fur: 1,
							wood: 1,
							meat: 1
						},
						benefit: {
							water: 7
						}
					}
				}, {
					id: 'S32',
					name: 'Crow At Rest',
					symbol: 'supplies',
					strength: 3,
					power: {
						cost: {
							supplies: 2,
							fur: 2
						},
						benefit: {
							mountain: 3
						}
					}
				}, {
					id: 'W11',
					name: 'John Robertson',
					symbol: 'wood',
					strength: 1,
					power: {
						cost: {
							supplies: 2
						},
						benefit: {
							water: 3
						}
					}
				}, {
					id: 'W21',
					name: 'Three Eagles',
					symbol: 'wood',
					strength: 2,
					power: {
						cost: {
							supplies: 2
						},
						benefit: {
							horse: 1
						}
					}
				}, {
					id: 'W22',
					name: 'Man Crow',
					symbol: 'wood',
					strength: 2,
					power: {
						cost: {
							wood: 3
						},
						benefit: {
							water: 4
						}
					}
				}, {
					id: 'W31',
					name: 'Twisted Hair',
					symbol: 'wood',
					strength: 3,
					power: {
						cost: {
							canoe: 1
						},
						benefit: {
							canoe: 2
						}
					}
				}
			],
			startingCards: [
				{
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
					power: {
						cost: {},
						benefit: {
							indians: 2
						}
					}
				}, {
					id: 'P13',
					name: 'Seamor',
					symbol: 'meat',
					strength: 1,
					power: {
						cost: {},
						benefit: {
							meat: 2
						}
					}
				}, {
					id: 'P14',
					name: 'Hugh McNeal',
					symbol: 'wood',
					strength: 1,
					power: {
						cost: {},
						benefit: {
							wood: 2
						}
					}
				}, {
					id: 'P15',
					name: 'Alexander H. Willard',
					symbol: 'supplies',
					strength: 1,
					power: {
						cost: {},
						benefit: {
							supplies: 2
						}
					}
				}, {
					id: 'P16',
					name: 'Richard Windsor',
					symbol: 'fur',
					strength: 1,
					power: {
						cost: {},
						benefit: {
							fur: 2
						}
					}
				}
			]
		};
	}
]);
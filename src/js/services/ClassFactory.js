mainApp.factory('ClassFactory', [
	'BoatFactory',
	'CardFactory',
	'MapFactory',
	'ItemFactory',
	function ClassFactory(BF, CF, MAP, IF) {
		'use strict';

		function findStartSpace() {
			var start = _.find(MAP.map, {special: 'start'});

			return _.indexOf(MAP.map, start);
		}

		const allColors = ['lightsalmon', 'orchid', 'lightgreen', 'lightblue', 'lightcoral'];
		const ClassFactory = {
			Corp: class Corp {
				constructor() {
					this.supplyBoats = BF.startSupply();
					this.indianBoats = BF.startIndian();
				}
				get cost() {
					var time = this.supplyBoats.reduce((time, boat) => time + boat.cost(), 0);

					return this.indianBoats.reduce((time, boat) => time + boat.cost(), time);
				}
				noPay() {
					this.supplyBoats.map(boat => {
						boat.content.map(item => {
							item.delete = false;
						});
					});
				}
				reset() {
					this.indianBoats.map(boat => {
						boat.content.map(indian => {
							indian.inUse = false;
						});
					});
				}
				optimize() {
					// do something here to move all the supplies & indians to their ideal positions
				}
			},

			Deck: class Deck {
				constructor() {
					this.cards = CF.startingCards();
					this.activeCardId = '';
				}
				get activeCard() {
					return _.find(this.cards, {id: this.activeCardId});
				}
				get cost() {
					return this.heldCards.length;
				}
				get heldCards() {
					return this.cards.filter(card => !card.played);
				}
				get playedCards() {
					return this.cards.filter(card => card.played);
				}
				findById(cardId) {
					return _.find(this.cards, {id: cardId});
				}
				reset() {
					this.cards.map(card => {
						card.played = false;
						card.plays = 0;
					});
				}
				play(card) {
					var idx = _.findIndex(this.cards, card);

					this.cards[idx].played = true;
				}
				remove(card) {
					var idx = _.findIndex(this.cards, card);

					this.cards.splice(idx, 1);
				}
			},

			Player: class Player {
				/*
				 * Player has a name, a color, a deck, and a corp
				 */
				constructor(name, idx, color) {
					this.name = name;
					this.color = color || allColors.splice(-1)[0];
					this.corp = new ClassFactory.Corp();
					this.deck = new ClassFactory.Deck();
					this.space = findStartSpace();
					this.idx = idx;
					this.notCamped = true;
					this.notRecruited = true;
					this.takenMainAction = false;
					this.recruitPayment = 0;
					this.addIndian();
				}
				get cost() {
					return this.deck.cost + this.corp.cost;
				}
				get strengthAvailable() {
					return this.playStrength > this.deck.activeCard.plays;
				}
				get indianCount() {
					return this.corp.indianBoats.reduce((total, boat) => total + boat.content.filter(indian => !indian.inUse).length, 0);
				}
				endTurn() {
					this.playStrength = 0;
					this.deck.activeCardId = '';
					this.notCamped = true;
					this.notRecruited = true;
					this.takenMainAction = false;
				}
				camp() {
					this.notCamped = false;
					this.corp.optimize();

					if (this.space <= this.cost) {
						this.space = 0;
					} else {
						this.space -= this.cost;
						//this.checkForScouts(-1);
					}

					this.deck.reset();
					this.corp.reset();
				}
				goBack(time) {
				}
				useAbility(idx) {
					var ability = this.deck.activeCard.abilities[idx];

					if (this.strengthAvailable) {
						if (ability.cost) {
							if (this.payCost(ability.cost)) {
								this.benefit(ability.benefit);
							} else {
								console.log('you cannot aford that ability');
							}
						} else {
							this.benefit(ability.benefit);
						}
					}
				}
				playCard(card) {
					if (this.takenMainAction) {
						return false;
					}
					this.takenMainAction = true;
					this.playStrength = 0;
					this.deck.play(card);
					this.deck.activeCardId = card.id;
					
					return true;
				}
				addIndian(added) {
					this.corp.indianBoats.map(boat => {
						if (boat.content.length < boat.capacity && !added) {
							boat.content.push(IF.indian());
							added = true;
						}
					});
				}
				payCost(cost) {
					var tempCost = _.clone(cost);
					this.corp.supplyBoats.map(boat => {
						boat.content.map(item => {
							if (tempCost[item.name] > 0) {
								tempCost[item.name]--;
								item.delete = true;
							}
						});
					});

					if (_.every(_.values(tempCost), cost => cost === 0)) {
						this.corp.supplyBoats.map(boat => {
							boat.content = boat.content.filter(item => !item.delete);
						});

						return true;
					} else {
						this.corp.noPay();
					}
				}
				benefit(benefit) {
					this.deck.activeCard.plays++;
					_.mapKeys(benefit, (amount, key) => {
						for (let i = 0; i < amount; i++) {
							var item = _.find(IF.allItems, {name: key});

							if (item) {
								this.collect(item);
							} else if (key === 'indian') {
								this.addIndian();
							} else if (key === 'mountain' || key === 'water') {
								this.travel(key);
							}
						}
					});
					//this.checkForScouts(1);
				}
				travel(terrain) {
					var space = this.space;
					var nextSpace = MAP.map[space + 1];

					if (nextSpace.terrain == terrain || nextSpace.terrain == 'mixed') {
						console.log('You moved 1 space on to ' + nextSpace.terrain + ' terrain');
						this.space++;
					} else {
						console.log('You did not move off of your ' + MAP.map[space].terrain + ' terrain');
					}
				}
				collect(item, added) {
					this.corp.supplyBoats.map(boat => {
						if (boat.content.length < boat.capacity && !added) {
							boat.content.push(_.clone(item));
							added = true;
						}
					});

					if (!added) {
						console.log('no space for that item');
					}
				}
				// checkForScouts(direction) {
				// 	var dupes = $s.allPlayers.filter(
				// 		player => (player.name != this.name) && (player.space == this.space)
				// 	);

				// 	if (dupes.length) {
				// 		this.space += direction;
				// 		this.checkForScouts(direction);
				// 	}
				// }
			},

			User: class User {
				constructor() {}
			}
		};

		return ClassFactory;
	}
]);
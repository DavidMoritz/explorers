mainApp.factory('EventFactory', [
	'BoatFactory',
	'CardFactory',
	'FirebaseFactory',
	'ClassFactory',
	function EventFactory(BF, CF, FF, Class) {
		'use strict';
		/**
		 * Note: $s needs to be defined. This can be done by setting this entire
		 * factory as a property of $s and calling the methods from that property
		 */

		var EF = {
			gameCreated: resolve => {
				resolve();
			},
			restartTurn: resolve => {
				// not currently working
				var idx = _.findLastIndex($s.activeGame.events, e => e.name == 'changeCurrentPlayer' || e.name == 'startGame') + 1;
				setTimeout(() => {
					$s.activeGame.events.splice(idx);
					$s.restartTurn = true;
					resolve();
				}, 1000);
			},
			startGame: resolve => {
				var users = FF.getFBObject('users');
				users.$loaded(() => {
					$s.activeGame.playerIds.map(id => {
						var user = users[id];
						$s.allPlayers.push(new Class.Player(user.firstName, $s.allPlayers.length + 1));
					});
					EF.changeCurrentPlayer(resolve);
				});
			},
			// if a function uses `this` for the event, it cannot be an arrow function
			playCard: function(resolve) {
				var card = $s.currentPlayer.deck.findById(this.cardId);
				console.log(`Event ${$s.eventTracker}:`, $s);

				if ($s.currentPlayer.playCard(card)) {
					$s.openModal('Strength', resolve);
				} else {
					resolve();
				}
			},
			useAbility: function(resolve) {
				$s.currentPlayer.useAbility(this.idx);
				resolve();
			},
			addStrength: function(resolve) {
				var card = $s.currentPlayer.deck.findById(this.cardId);

				if ($s.currentPlayer.playStrength < 3) {
					$s.currentPlayer.playStrength += card.strength;
					$s.currentPlayer.deck.play(card);

					if ($s.currentPlayer.playStrength > 3) {
						$s.currentPlayer.playStrength = 3;
					}
				} else {
					$s.notify('cannot go above 3', 'warning');
				}
				resolve();
			},
			addIndianToStrength: resolve => {
				var added = false;

				if ($s.currentPlayer.playStrength < 3) {
					$s.currentPlayer.corp.indianBoats.reverse();
					$s.currentPlayer.corp.indianBoats.map(boat => {
						var indian = _.find(boat.content, {inUse: false});

						if (indian && !added) {
							indian.inUse = true;
							added = true;
							$s.currentPlayer.playStrength++;
						}
					});

					if (!added) {
						$s.notify('you do not have any more to use');
					}
					$s.currentPlayer.corp.indianBoats.reverse();
				} else {
					$s.notify('cannot go above 3');
				}
				resolve();
			},
			camp: resolve => {
				$s.currentPlayer.camp();
				resolve();
			},
			recruitCard: function(resolve) {
				var card = $s.journal.splice(this.idx, 1)[0];
				$s.currentPlayer.payCost({
					equipment: card.strength - $s.currentPlayer.recruitPayment,
					fur: this.idx + 1
				});
				$s.currentPlayer.recruitPayment = 0;
				card.played = false;
				card.plays = 0;

				$s.currentPlayer.deck.cards.push(card);
				resolve();
			},
			closeModal: resolve => {
				$s.modalInstance.close();
				resolve();
			},
			openRecruit: resolve => {
				$s.openModal('Recruit', resolve);
			},
			openRecruitPayment: function(resolve) {
				if ($s.currentPlayer.checkEquipmentForRecruit(this.strength)) {
					if ($s.currentPlayer.payCost({fur: this.fur})) {
						$s.recruitCard = _.find($s.journal, {id: this.cardId});
						$s.openModal('RecruitPayment', resolve);
					} else {
						$s.notify('you do not have enough fur.', 'danger');
						resolve();
					}
				} else {
					$s.notify('you do not have enough equipment', 'danger');
					resolve();
				}
			},
			openBoard: resolve => {
				$s.openModal('Board', resolve);
			},
			recruitPayment: function(resolve) {
				var payment = {
					equipment: $s.recruitCard.strength
				};

				if (this.cardId) {
					var card = $s.currentPlayer.deck.findById(this.cardId);
					payment.equipment = Math.max(payment.equipment - card.strength, 0);
					$s.currentPlayer.deck.remove(card);
				}

				$s.currentPlayer.payCost(payment);
				$s.currentPlayer.deck.add($s.recruitCard);
				$s.currentPlayer.notRecruited = false;
				_.remove($s.journal, $s.recruitCard);
				$s.recruitCard = null;
				resolve();
			},
			addIndianFromSupply: resolve => {
				if ($s.indianSupply === 0) {
					return;
				}
				$s.currentPlayer.addIndian();
				$s.indianSupply--;
				resolve();
			},
			changeCurrentPlayer: resolve => {
				if ($s.currentPlayer) {
					$s.currentPlayer.endTurn();
					var currentIdx = $s.currentPlayer.idx;
					$s.currentPlayer = currentIdx == $s.allPlayers.length ? $s.allPlayers[0] : $s.allPlayers[currentIdx];
				} else {
					$s.currentPlayer = $s.allPlayers[0];
				}
				$s.activeGame.message = {};
				EF.closeModal(resolve);
			},
			addBoat: function(resolve) {
				if ($s.currentPlayer.payCost({wood: 3})) {
					var boatsArr = $s.currentPlayer.corp[this.type + 'Boats'];

					boatsArr.push(BF[this.type + this.size]());
					$s.currentPlayer.corp[this.type + 'Boats'] = _.sortBy(boatsArr, 'capacity');

					if (this.type === 'indian') {
						$s.addIndianFromSupply();
					}
				}
				resolve();
			}
		};

		return EF;
	}
]);

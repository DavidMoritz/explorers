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

		function notify(message) {
			$('.notices').text(message);
		}

		var EF = {
			gameCreated: resolve => {
				resolve();
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

				if ($s.currentPlayer.playCard(card)) {
					$s.openStrengthModal();
				}

				console.log(`Event ${$s.eventTracker}:`, $s);
				resolve();
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
					console.log('cannot go above 3');
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
						console.log('you do not have any more to use');
					}
					$s.currentPlayer.corp.indianBoats.reverse();
				} else {
					console.log('cannot go above 3');
				}
				resolve();
			},
			camp: resolve => {
				$s.currentPlayer.camp();
				resolve();
			},
			recruit: function(resolve) {
				// add recuit from this.cardId
				resolve();
			},
			openRecruit: resolve => {
				$s.openRecruitModal();
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
				$s.closeStrengthModal();
				resolve();
			},
			addBoat: (type, size) => {
				if ($s.currentPlayer.payCost({wood: 3})) {
					var boatsArr = $s.currentPlayer.corp[type + 'Boats'];

					boatsArr.push(BF[type + size]());
					$s.currentPlayer.corp[type + 'Boats'] = _.sortBy(boatsArr, 'capacity');

					if (type === 'indian') {
						$s.addIndianFromSupply();
					}
				}
			}
		};

		return EF;
	}
]);

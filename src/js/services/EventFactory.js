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
			startGame: () => {
				var users = FF.getFBObject('users');
				users.$loaded(() => {
					$s.activeGame.playerIds.map(id => {
						var user = users[id];
						$s.allPlayers.push(new Class.Player(user.firstName, $s.allPlayers.length + 1));
					});
					EF.changeCurrentPlayer();
				});
			},
			playCard: e => {
				var card = _.find(CF.journalCards, {id: e.card});

				if ($s.currentPlayer.playCard(card)) {
					$s.openModal();
				}
				console.log(`Event ${$s.eventTracker}:`, $s);
			},
			camp: () => {
				$s.currentPlayer.camp();
			},
			addIndianFromSupply: player => {
				if ($s.indianSupply === 0) {
					return;
				}
				$s.currentPlayer.addIndian();
				$s.indianSupply--;
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
			},
			changeCurrentPlayer: () => {
				if ($s.currentPlayer) {
					$s.currentPlayer.endTurn();
					var currentIdx = $s.currentPlayer.idx;
					$s.currentPlayer = currentIdx == $s.allPlayers.length ? $s.allPlayers[0] : $s.allPlayers[currentIdx];
				} else {
					$s.currentPlayer = $s.allPlayers[0];
				}
			}
		};

		return EF;
	}
]);

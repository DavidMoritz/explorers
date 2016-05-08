mainApp.factory('EventFactory', [
	function EventFactory() {
		'use strict';
		/**
		 * Note: $s needs to be defined. This can be done by setting this entire
		 * factory as a property of $s and calling the methods from that property
		 */

		function notify(message) {
			$('.notices').text(message);
		}

		return {
			playCard: function playCard(e) {
				console.log(`Event ${$s.eventTracker}:`, $s);
			},
			addIndianFromSupply: function addIndianFromSupply(player) {
				if ($s.indianSupply === 0) {
					return;
				}
				$s.currentPlayer.addIndian();
				$s.indianSupply--;
			},
			addBoat: function addBoat(type, size) {
				if ($s.currentPlayer.payCost({wood: 3})) {
					var boatsArr = $s.currentPlayer.corp[type + 'Boats'];

					boatsArr.push(new BF[type + size]());
					$s.currentPlayer.corp[type + 'Boats'] = _.sortBy(boatsArr, 'capacity');

					if (type === 'indian') {
						$s.addIndianFromSupply();
					}
				}
			},
			changeCurrentPlayer: function changeCurrentPlayer() {
				if ($s.currentPlayer) {
					$s.currentPlayer.endTurn();
					var currentIdx = $s.currentPlayer.idx;
					$s.currentPlayer = currentIdx == $s.allPlayers.length ? $s.allPlayers[0] : $s.allPlayers[currentIdx];
				} else {
					$s.currentPlayer = $s.allPlayers[0];
				}
			}
		};
	}
]);

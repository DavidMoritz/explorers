mainApp.controller('MainCtrl', [
	'$scope',
	'$timeout',
	'$interval',
	'$uibModal',
	'ItemFactory',
	'BoatFactory',
	'ClassFactory',
	'MapFactory',
	'FirebaseFactory',
	'EventFactory',
	'CardFactory',
	function MainCtrl($s, $timeout, $interval, $uibM, IF, BF, Class, MF, FF, EF, CF) {
		'use strict';

		function init() {
			//	init stuff
			window.$s = $s;

			/**
			// remove scrolling also removes click and drag
			window.addEventListener('touchmove', function disallowScrolling(event) {
				if ($(document).width() >= 768) {
					event.preventDefault();
				}
			}, false);
			*/
			listenToChat();
		}

		function restartTurn() {
			// this is not working.
			var id = $s.activeGame.id;
			$s.currentPlayer = null;
			$s.allPlayers = [];
			$s.activeGame = {};
			$s.restartTurn = false;
			$s.joinActiveGame({id: id});
		}

		function updateGame() {
			if ($s.restartTurn) {
				restartTurn();
			} else if ($s.eventTracker < $s.activeGame.events.length) {
				$s.activeGame.events.reduce(prevEvent => {
					return prevEvent.then(_ => {
						return runEvent(++$s.eventTracker);
					}, _ => $s);
				}, runEvent($s.eventTracker));
			}
		}

		function runEvent(idx) {
			if (idx >= $s.activeGame.events.length) {
				$s.eventTracker = $s.activeGame.events.length;
				// return meaningless function to avoid error
				return {then: _ => 0};
			}
			var event = $s.activeGame.events[idx];
			var eventFunction = EF[event.name];

			return new Promise(eventFunction.bind(event));
		}

		function listenToChat() {
			window.latestChat = FF.getFBObject('message');
			window.stopChat = latestChat.$watch(() => {
				$s.chatList.push(_.clone(latestChat));
			});
		}

		/**
		 * Shuffle Journal
		 * The game needs to shuffle the cards in a predictable way
		 * so that every user gets the same outcome. This is done by
		 * 'seeding' the algorithm with the randomly generated gameId.
		 * This algorthim has been tested over larger iterations here:
		 * https://jsfiddle.net/sr7djh8x/6/
		 */
		function shuffleJournal() {
			var shuffledDeck = CF.journalCards.sort((a, b) => {
				var gameNumber = parseInt($s.activeGame.id, 36);
				var firstCardNum = parseInt(a.id, 36);
				var secondCardNum = parseInt(b.id, 36);

				return (gameNumber % firstCardNum) - (gameNumber % secondCardNum);
			});

			var startJournal = shuffledDeck.splice(0,5);
			startJournal.sort((a, b) => a.strength - b.strength);

			$s.journal = startJournal.concat(shuffledDeck);
		}

		function createNewUser(authData) {
			var allUsers = FF.getFBObject('users');

			allUsers.$loaded(_ => {
				allUsers[authData.uid] = {
					createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
					name: authData.facebook.displayName,
					rating: 1200,
					uid: authData.uid,
					gender: authData.facebook.cachedUserProfile.gender,
					firstName: authData.facebook.cachedUserProfile.first_name,
					lastName: authData.facebook.cachedUserProfile.last_name,
					picture: authData.facebook.cachedUserProfile.picture.data.url,
					timezone: authData.facebook.cachedUserProfile.timezone
				};
				allUsers.$save();
				$s.currentUser = allUsers[authData.uid];
			});
		}

		function leaveGame() {
			$s.activeGame = null;
			listenToChat();
		}

		function updateCursor() {
			$s.cursor.left = ($s.activeGame.cursor.left + Math.max(($('body').width() - $('.container').width()) / 2, 0)) + 'px';
			$s.cursor.top = $s.activeGame.cursor.top + 'px';
		}

		function openModal(name, resolve) {
			$s.modalInstance = $uibM.open({
				animation: true,
				templateUrl: name.toLowerCase() + 'Modal',
				controller: name + 'ModalInstanceCtrl',
				size: 'lg',
				resolve: resolve
			});
		}

		function countSymbols(type) {
			var searchThesePlayers = [$s.currentPlayer.idx];

			if ($s.currentPlayer.idx == $s.allPlayers.length) {
				searchThesePlayers.push(1);
				searchThesePlayers.push($s.currentPlayer.idx - 1);
			} else if ($s.currentPlayer.idx == 1) {
				searchThesePlayers.push($s.allPlayers.length);
				searchThesePlayers.push($s.currentPlayer.idx + 1);
			} else {
				searchThesePlayers.push($s.currentPlayer.idx - 1);
				searchThesePlayers.push($s.currentPlayer.idx + 1);
			}

			var players = $s.allPlayers.filter(player => searchThesePlayers.indexOf(player.idx) !== -1);
			
			return players.reduce((count, player) => {
				return count + player.deck.playedCards.filter(card => card.symbol == type).length;
			}, 0);
		}

		//	initialize scoped variables
		_.assign($s, {
			allItems: IF.allItems,
			allPlayers: [],
			ff: {
				gameName: 'newGame'
			},
			map: MF.map,
			state: 'welcome',
			eventTracker: 0,
			chatList: [],
			recruitCard: {},
			activeGame: {},
			modalInstance: {
				close: _ => 0
			},
			cursor: {
				left: '0px',
				top: '0px'
			},
			boardSpaces: CF.boardSpaces.map(space => {
				space.contents = [];
				space.max = space.max || 1;
				space.allow = space.allow || 1;

				return space;
			})
		});

		$s.dragBoatSuccess = (boat, idx) => {
			$s.addEvent({
				name: 'removeItem',
				idx: idx,
				boatId: boat.id,
				playerId: $s.user.uid
			});
		};

		$s.dragCollectSuccess = idx => {
			$s.addEvent({
				name: 'collectItem',
				idx: idx
			});
		};

		$s.dropBoatSuccess = (boat, item) => {
			$s.addEvent({
				name: 'addItem',
				boatId: boat.id,
				playerId: $s.user.uid,
				item: item.name
			});
		};

		$s.validSupplyDrop = _ => {
			return $('.dragging').find('.indian').length === 0;
		};

		$s.validIndianDrop = _ => {
			return $('.dragging').find('.indian').length;
		};

		$s.userTurn = _ => {
			if ($s.currentUser && $s.currentPlayer) {
				return $s.currentUser.uid == $s.currentPlayer.uid;
			}

			return false;
		};

		$s.addEvent = event => {
			if (typeof event == 'string') {
				event = {name: event};
			}
			event.timestamp = new Date().getTime();
			$s.activeGame.events.push(event);
		};

		$s.createNewGame = _ => {
			var rand = Math.random().toString(36).substring(2, 10);
			allGames.$ref().update({[rand]: {
				id: rand,
				name: $s.ff.gameName,
				timestamp: new Date().getTime(),
				events: [{
					name: 'gameCreated'
				}],
				hostId: $s.currentUser.uid,
				active: true,
				public: true,
				cursor: {
					left: 0,
					top: 0
				}
			}}, _ => {
				$s.joinActiveGame({id: rand});
			});
		};

		$s.joinActiveGame = game => {
			if ($s.activeGame.id || !$s.currentUser) {
				return;
			}

			var activeGame = FF.getFBObject(`allGames/${game.id}`);
			activeGame.$bindTo($s, 'activeGame');

			activeGame.$loaded(_ => {
				if (!$s.activeGame.playerIds) {
					$s.activeGame.playerIds = [];
				}

				if ($s.activeGame.playerIds.indexOf($s.currentUser.uid) === -1) {
					$s.activeGame.playerIds.push($s.currentUser.uid);
				}
				shuffleJournal();
				$s.eventTracker = 0;
				$s.$watch('activeGame.events', updateGame);
				$s.$watch('activeGame.cursor', updateCursor);
			});
			stopChat();
		};

		$s.moveCursor = e => {
			if ($s.userTurn()) {
				var offset = Math.max(($('body').width() - $('.container').width()) / 2, 0);
				$s.activeGame.cursor.left = e.pageX - offset + 2;
				$s.activeGame.cursor.top = e.pageY + 2;
			}
		};

		$s.submitChat = _ => {
			if (!$s.ff.chat.length) {
				return;
			}
			latestChat.user = $s.currentUser.firstName;
			latestChat.text = $s.ff.chat;
			latestChat.$save();
			$s.ff.chat = '';
		};

		$s.fbLogin = _ => {
			FF.facebookLogin(err => {
				console.log('There was an error', err);
				// ** TEMPORARY FOR DEV ***
				console.log('Dev login: David Moritz');
				$s.currentUser = FF.getFBObject('users/facebook:10156817857345403');
				$s.state = 'joinGame';
				$s.chatList = [];
			}, authData => {
				console.log('Authenticated successfully with payload:', authData);
				$s.currentUser = FF.getFBObject('users/' + authData.uid);
				$s.currentUser.$loaded(user => {
					if (!user.uid) {
						createNewUser(authData);
					}
					$s.state = 'joinGame';
				});
				$s.chatList = [];
			});
		};

		$s.callPlayCard = card => {
			if ($s.userTurn() && !$s.currentPlayer.takenMainAction) {
				$s.addEvent({
					name: 'playCard',
					cardId: card.id
				});
			} else {
				$s.viewCard(card);
			}
		};

		$s.addStrength = card => {
			if ($s.userTurn() && !$s.currentPlayer.strengthAdded) {
				$s.addEvent({
					name: 'addStrength',
					cardId: card.id
				});
			} else {
				$s.viewCard(card);
			}
		};

		$s.useAbility = idx => {
			if ($s.userTurn()) {
				$s.addEvent({
					name: 'useAbility',
					idx: idx,
					wood: countSymbols('wood'),
					equipment: countSymbols('equipment'),
					fur: countSymbols('fur'),
					meat: countSymbols('meat')
				});
			}
		};

		$s.addIndian = _ => {
			if ($s.userTurn()) {
				$s.addEvent('addIndianToStrength');
			}
		};	

		$s.recruitThisCard = card => {
			if ($s.userTurn()) {
				$s.addEvent({
					name: 'openRecruitPayment',
					cardId: card.id,
					strength: card.strength,
					fur: $s.journal.indexOf(card) + 1
				});
			} else {
				$s.viewCard(card);
			}
		};

		$s.recruitPayment = card => {
			if ($s.userTurn()) {
				if (card) {
					$s.addEvent({
						name: 'recruitPayment',
						cardId: card.id
					});
				} else {
					$s.addEvent('recruitPayment');
				}
			} else {
				$s.viewCard(card);
			}
		};

		$s.clickBoardSpace = space => {
			if ($s.userTurn() && !$s.currentPlayer.takenMainAction) {
				if ($s.currentPlayer.indianCount) {
					if (space.contents.length < space.max) {
						space.contents.push($s.currentPlayer.corp.payIndian());
						$s.currentPlayer.takenMainAction = true;
						$s.addEvent(space.event);
					} else {
						$s.notify('That space is full');
					}			
				} else {
					$s.notify('You need an indian to use that space');
				}
			}
		};

		$s.viewCard = card => {
			openModal('ViewCard', {
				card: card
			});
		};

		$s.viewPlayer = player => {
			openModal('ViewPlayer', {
				player: player
			});
		};

		$s.viewBoard = _ => {
			if ($s.userTurn() && !$s.currentPlayer.takenMainAction) {
				if ($s.state == 'board') {
					$s.addEvent('backToPlayCard');
				} else {
					$s.addEvent('openBoard');
				}
			} else {
				openModal('ViewBoard');
			}
		};

		$s.viewRecruit = _ => {
			if ($s.userTurn() && $s.currentPlayer.notRecruited) {
				if ($s.state == 'recruit') {
					$s.addEvent('backToPlayCard');
				} else {
					$s.addEvent('openRecruit');
				}
			} else {
				openModal('ViewRecruit');
			}
		};

		$s.notify = (message, type) => {
			clearTimeout($s.cancelMessage);
			type = type || 'info';

			$s.activeGame.message = {
				text: message,
				type: type
			};

			$s.cancelMessage = setTimeout(_ => {
				$s.activeGame.message = {};
			}, 4000);
		};

		// grab all the games and make sure Firebase is working!
		window.allGames = FF.getFBObject('allGames');
		allGames.$bindTo($s, 'allGames');
		allGames.$loaded(_ => {
			$s.notify('Firebase is working!');
			$('body').addClass('facebook-available');
			init();
		});
	}
]);
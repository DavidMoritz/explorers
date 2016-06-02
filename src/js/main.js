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
			$s.joinableGames = _.mapKeys($s.allGames, (game, key) => {
				if (typeof game === 'object' && game && game.name) {
					switch (true) {
						case (game.playerIds.indexOf($s.currentUser.uid) !== -1):
						case (game.public && !game.active):
							return key;
					}
				}

				return 'skip';
			});
			delete $s.joinableGames.skip;
			$s.state = 'joinGame';
			$s.chatList = [];
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
					return prevEvent.then(() => {
						return runEvent(++$s.eventTracker);
					}, () => $s);
				}, runEvent($s.eventTracker));
			}
		}

		function runEvent(idx) {
			if (idx >= $s.activeGame.events.length) {
				$s.eventTracker = $s.activeGame.events.length;
				// return meaningless function to avoid error
				return {then: () => 0};
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

			allUsers.$loaded(() => {
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
				init();
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
			special: {},
			modalInstance: {
				close: () => 0
			},
			cursor: {
				left: '0px',
				top: '0px'
			},
			boardSpaces: CF.boardSpaces.map(space => {
				space.content = space.event == 'boardPowWow' ? [IF.indian()] : [];
				space.allow = space.allow || 1;

				return space;
			}),
			chooseBoats: BF.chooseBoats
		});

		$s.getFaceUpPlayedCards = () => {
			return $s.allPlayers.reduce((cards, player) => {
				return cards.concat(player.deck.cards.filter(card => card.played && !card.support));
			},[]);
		};

		$s.newComer = () => {
			if ($s.indianSupply) {
				var powwow = _.find($s.boardSpaces, {event: 'boardPowWow'});

				powwow.content.push(IF.indian());
				$s.indianSupply--;
			}
		};

		$s.dragBoatSuccess = (boat, idx) => {
			// hide the item
			$(`.${boat.id}`).find('.item').eq(idx).addClass('hidden');
			setTimeout(() => {
				$('.item.hidden').removeClass('hidden');
			}, 1000);

			$s.addEvent({
				name: 'removeItem',
				idx: idx,
				boatId: boat.id,
				playerId: $s.user.uid
			});
		};

		$s.dragCollectSuccess = idx => {
			// hide the item
			$('.collect-boat').find('.item').eq(idx).addClass('hidden');
			setTimeout(() => {
				$('.item.hidden').removeClass('hidden');
			}, 1000);

			$s.addEvent({
				name: 'collectItem',
				idx: idx
			});
		};

		$s.dragHorseSuccess = idx => {
			// hide the item
			$('.horse-payment-space').find('.item').eq(idx).addClass('hidden');
			setTimeout(() => {
				$('.item.hidden').removeClass('hidden');
			}, 1000);

			$s.addEvent({
				name: 'removeHorseItem',
				idx: idx
			});
		};

		$s.dragCanoeSuccess = idx => {
			// hide the item
			$('.canoe-payment-space').find('.item').eq(idx).addClass('hidden');
			setTimeout(() => {
				$('.item.hidden').removeClass('hidden');
			}, 1000);

			$s.addEvent({
				name: 'removeCanoeItem',
				idx: idx
			});
		};

		$s.dropBoatSuccess = (boat, item) => {
			$s.addEvent({
				name: 'addItem',
				boatId: boat.id,
				playerId: $s.user.uid,
				item: item.name,
				used: item.inUse || false
			});
		};

		$s.dropHorsePayment = item => {
			$s.addEvent({
				name: 'horsePayment',
				item: item.name
			});
		};

		$s.horseCollectionText = () => {
			var count = $s.horseCollectionCount();

			switch (count) {
				case -1:
					return 'Cannot Collect Yet';
				case 1:
					return 'Collect 1 Horse';
				default:
					return `Collect ${count} Horses`;
			}
		};

		$s.horseCollectionCount = () => {
			var indians = $s.horsePayment.content.filter(item => item.name == 'indian').length;
			var notIndians = $s.horsePayment.content.length - indians;

			if (notIndians % 3 === 0 && indians <= 2) {
				var max = notIndians / 3;
				var total = $s.horsePayment.content.reduce((total, item) => {
					if (item.name != 'indian') {
						total[item.name] = ++total[item.name] || 1;
					}

					return total;
				}, {});

				if (indians < max - 1) {
					return -1;
				}

				return _.values(total).filter(val => val > max).length ? -1 : max;
			}

			return -1;
		};

		$s.dropCanoePayment = item => {
			$s.addEvent({
				name: 'canoePayment',
				item: item.name
			});
		};

		$s.canoeCollectionText = () => {
			var count = $s.canoeCollectionCount();

			switch (count) {
				case -1:
					return 'Cannot Collect Yet';
				case 1:
					return 'Collect 1 Canoe';
				default:
					return `Collect ${count} Canoes`;
			}
		};

		$s.canoeCollectionCount = () => {
			var indians = $s.canoePayment.content.filter(item => item.name == 'indian').length;
			var wood = $s.canoePayment.content.filter(item => item.name == 'wood').length;

			if (wood % 2 === 0 && indians <= 2 && $s.canoePayment.content.length == indians + wood) {
				var max = wood / 2;

				return indians < max - 1 ? -1 : max;
			}

			return -1;
		};

		$s.validSupplyDrop = () => {
			return $('.dragging').find('.indian').length === 0;
		};

		$s.validIndianDrop = check => {
			var indian = $('.dragging').find('.indian');

			return check ? indian.not('.used').length : indian.length;
		};

		$s.userTurn = () => {
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

		$s.createNewGame = () => {
			var rand = Math.random().toString(36).substring(2, 10);
			allGames.$ref().update({[rand]: {
				id: rand,
				//name: $s.ff.gameName,
				name: `${$s.currentUser.firstName}'s Game`,
				timestamp: new Date().getTime(),
				events: [{
					name: 'gameCreated'
				}],
				hostId: $s.currentUser.uid,
				active: false,
				public: true,
				cursor: {
					left: 0,
					top: 0
				}
			}}, () => {
				$s.joinActiveGame({id: rand});
			});
		};

		$s.joinActiveGame = game => {
			if ($s.activeGame.id || !$s.currentUser) {
				return;
			}

			var activeGame = FF.getFBObject(`allGames/${game.id}`);
			activeGame.$bindTo($s, 'activeGame');

			activeGame.$loaded(() => {
				if (!$s.activeGame.playerIds) {
					$s.activeGame.playerIds = [];
					$s.activeGame.playerNames = [];
				}

				if ($s.activeGame.playerIds.indexOf($s.currentUser.uid) === -1) {
					$s.activeGame.playerIds.push($s.currentUser.uid);
					$s.activeGame.playerNames.push($s.currentUser.name);
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

		$s.trash = card => {
			if ($s.userTurn() && $s.currentPlayer.trashCount) {
				$s.addEvent({
					name: 'trashCard',
					cardId: card.id
				});
			} else {
				$s.viewCard(card);
			}
		};

		$s.useFaceUpAbility = card => {
			if ($s.userTurn()) {
				$s.addEvent({
					name: 'useFaceUpAbility',
					cardId: card.id
				});
			} else {
				$s.viewCard(card);
			}
		};

		$s.chooseBoat = (type, size) => {
			if ($s.userTurn()) {
				$s.addEvent({
					name: 'collectBoat',
					type: type,
					size: size
				});
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

		$s.useAbility = (idx, ability) => {
			if ($s.userTurn() && $s.currentPlayer.strengthAvailable) {
				$s.addEvent({
					name: ability.event || 'useAbility',
					idx: idx,
					wood: countSymbols('wood'),
					equipment: countSymbols('equipment'),
					fur: countSymbols('fur'),
					meat: countSymbols('meat')
				});
			}
		};

		$s.useFaceUpCardAbility = (idx, ability) => {
			if ($s.userTurn()) {
				$s.addEvent({
					name: ability.event || 'useFaceUpCardAbility',
					idx: idx,
					wood: countSymbols('wood'),
					equipment: countSymbols('equipment'),
					fur: countSymbols('fur'),
					meat: countSymbols('meat')
				});
			}
		}; 

		$s.addIndian = () => {
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

		$s.clickBoardSpace = space => {
			if ($s.userTurn() && !$s.currentPlayer.takenMainAction) {
				if ($s.currentPlayer.indianCount) {
					if (space.content.length < space.max) {
						$s.addEvent({
							name: 'clickBoardSpace',
							space: space.event
						});
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

		$s.viewBoard = () => {
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

		$s.viewRecruit = () => {
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

			$s.cancelMessage = setTimeout(() => {
				$s.activeGame.message = {};
			}, 4000);
		};

		$s.submitChat = () => {
			if (!$s.ff.chat.length) {
				return;
			}
			latestChat.user = $s.currentUser.firstName;
			latestChat.text = $s.ff.chat;
			latestChat.$save();
			$s.ff.chat = '';
		};

		$s.fbLogin = () => {
			FF.facebookLogin(err => {
				console.log('There was an error', err);
				// ** TEMPORARY FOR DEV ***
				console.log('Dev login: David Moritz');
				$s.currentUser = FF.getFBObject('users/facebook:10156817857345403');
				$s.currentUser.$loaded(user => {
					init();
				});
			}, authData => {
				console.log('Authenticated successfully with payload:', authData);
				$s.currentUser = FF.getFBObject('users/' + authData.uid);
				$s.currentUser.$loaded(user => {
					if (!user.uid) {
						createNewUser(authData);
					} else {
						init();
					}
				});
			});
		};

		// grab all the games and make sure Firebase is working!
		window.allGames = FF.getFBObject('allGames');
		allGames.$bindTo($s, 'allGames');
		allGames.$loaded(() => {
			$('body').addClass('facebook-available');
			listenToChat();
		});
	}
]);
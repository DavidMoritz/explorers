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

		function listenToChat() {
			window.latestChat = FF.getFBObject('message');
			window.stopChat = latestChat.$watch(() => {
				$s.chatList.push(_.clone(latestChat));
			});
		}

		function shuffleJournal() {
			var shuffledDeck = CF.journalCards.sort((a, b) => {
				var gameNumber = parseInt($s.activeGame.id, 36);
				var firstCardNum = parseInt(a.id, 36);
				var secondCardNum = parseInt(b.id, 36);

				return (gameNumber % firstCardNum) - (gameNumber % secondCardNum);
			});

			var startJournal = shuffleDeck.splice(0,5);
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
			});
		}

		function updateGame() {
			for ($s; $s.eventTracker < $s.activeGame.events.length; $s.eventTracker++) {
				var event = $s.activeGame.events[$s.eventTracker];

				if (typeof $s.EF[event.name] === 'function') {
					$s.EF[event.name](event);
				}
			}
		}

		function leaveGame() {
			$s.activeGame = null;
			listenToChat();
		}

		//	initialize scoped variables
		_.assign($s, {
			allItems: IF.allItems,
			allPlayers: [],
			EF: EF,
			ff: {
				gameName: 'newGame'
			},
			map: MF.map,
			eventTracker: 0,
			chatList: []
		});

		$s.submitChat = () => {
			if (!$s.ff.chat.length) {
				return;
			}
			latestChat.user = $s.currentUser.firstName;
			latestChat.text = $s.ff.chat;
			latestChat.$save();
			$s.ff.chat = '';
		};

		$s.openModal = () => {
			var instance = $uibM.open({
				animation: true,
				templateUrl: 'strengthModal',
				controller: 'ModalInstanceCtrl',
				size: 'lg',
				resolve: {
					currentPlayer: () => $s.currentPlayer
				}
			});

			instance.result.then(currentPlayer => {
				$s.currentPlayer = currentPlayer;
			});
		};

		$s.fbLogin = () => {
			FF.facebookLogin(err => {
				console.log('There was an error', err);
				// ** TEMPORARY FOR DEV ***
				console.log('Dev login: David Moritz');
				$s.currentUser = FF.getFBObject('users/facebook:10156817857345403');
				$s.chatList = [];
			}, authData => {
				console.log('Authenticated successfully with payload:', authData);
				$s.currentUser = FF.getFBObject('users/' + authData.uid);
				$s.currentUser.$loaded(user => {
					if (!user.uid) {
						createNewUser(authData);
					}
				});
				$s.chatList = [];
			});
		};

		$s.createNewGame = () => {
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
					left: '0px',
					top: '0px'
				}
			}}, () => {
				$s.joinActiveGame({id: rand});
			});
		};

		$s.joinActiveGame = game => {
			if ($s.activeGame || !$s.currentUser) {
				return;
			}

			var activeGame = FF.getFBObject(`allGames/${game.id}`);
			activeGame.$bindTo($s, 'activeGame');

			activeGame.$loaded(() => {
				if (!$s.activeGame.playerIds) {
					$s.activeGame.playerIds = [];
				}
				$s.activeGame.playerIds.push($s.currentUser.uid);
				$s.eventTracker = 0;
				$s.$watch('activeGame.events', updateGame);
			});
			stopChat();
		};

		$s.moveCursor = e => {
			if ($s.activeGame && $s.activeGame.cursor) {
				$s.activeGame.cursor.left = (e.pageX + 2) + 'px';
				$s.activeGame.cursor.top = (e.pageY + 2) + 'px';
			}
		};

		$s.addEvent = event => {
			if (typeof event == 'string') {
				event = {name: event};
			}
			$s.activeGame.events.push(event);
		};

		$s.callPlayCard = card => {
			$s.addEvent({
				name: 'playCard',
				card: card.id
			});
		};

		window.allGames = FF.getFBObject('allGames');
		allGames.$bindTo($s, 'allGames');
		allGames.$loaded(() => {
			console.log('Firebase is working');
			$('.notices').text('Firebase is working!');
			$('body').addClass('facebook-available');
			init();
		});
	}
]);
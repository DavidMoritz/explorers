mainApp.controller('MainCtrl', [
	'$scope',
	'$timeout',
	'$interval',
	'$uibModal',
	'ItemFactory',
	'BoatFactory',
	'ClassFactory',
	'MapFactory',
	'MethodFactory',
	'FirebaseFactory',
	function MainCtrl($s, $timeout, $interval, $uibM, IF, BF, Class, MAP, MF, FF) {
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

		function openModal() {
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
		}

		function notify(message) {
			$('.notices').text(message);
		}

		//	initialize scoped variables
		_.assign($s, {
			allItems: IF.allItems,
			ff: {
				gameName: 'newGame'
			},
			map: MAP.map,
			get nonActive() {
				if (this.allGames) {
					return this.allGames.filter(game => !game.active);
				}

				return [];
			},
			get test() {
				console.log(this);
				
				return this.allGames;
			}
		});

		$s.fbLogin = () => {
			FF.facebookLogin(err => {
				console.log('There was an error', err);
				// ** TEMPORARY FOR DEV ***
				console.log('Dev login: David Moritz');
				$s.currentUser = FF.getFBObject('users/facebook:10156817857345403');
			}, authData => {
				console.log('Authenticated successfully with payload:', authData);
				$s.currentUser = FF.getFBObject('users/' + authData.uid);
				$s.currentUser.$loaded(user => {
					if (!user.uid) {
						createNewUser(authData);
					}
				});
			});
		};

		$s.createNewGame = () => {
			var rand = Math.random().toString(36).substring(2, 10);
			allGames.$ref().update({[rand]: {
				id: rand,
				name: $s.ff.gameName,
				timestamp: new Date().getTime(),
				eventsArray: [],
				playerIdArray: [$s.currentUser.uid],
				hostId: $s.currentUser.uid,
				active: true,
				public: true,
				cursor: {
					left: '0px',
					top: '0px'
				}
			}}, () => {
				var activeGame = FF.getFBObject('allGames/' + rand);
				activeGame.$bindTo($s, 'activeGame');
			});
		};

		$s.joinActiveGame = game => {
			if ($s.activeGame || !$s.currentUser) {
				return;
			}

			var activeGame = FF.getFBObject('allGames/' + game.id);
			activeGame.$bindTo($s, 'activeGame');

			activeGame.$loaded(() => {
				$s.activeGame.playerIdArray.push($s.currentUser.uid);
			});
		};

		$s.moveCursor = e => {
			if ($s.activeGame && $s.activeGame.cursor) {
				$s.activeGame.cursor.left = (e.pageX + 2) + 'px';
				$s.activeGame.cursor.top = (e.pageY + 2) + 'px';
			}
		};

		$s.callPlayCard = card => {
			if ($s.currentPlayer.playCard(card)) {
				openModal();
			}
		};

		$s.addIndianFromSupply = player => {
			if ($s.indianSupply === 0) {
				return;
			}
			$s.currentPlayer.addIndian();
			$s.indianSupply--;
		};

		$s.addBoat = (type, size) => {
			if ($s.currentPlayer.payCost({wood: 3})) {
				var boatsArr = $s.currentPlayer.corp[type + 'Boats'];

				boatsArr.push(new BF[type + size]());
				$s.currentPlayer.corp[type + 'Boats'] = _.sortBy(boatsArr, 'capacity');

				if (type === 'indian') {
					$s.addIndianFromSupply();
				}
			}
		};

		$s.changeCurrentPlayer = () => {
			if ($s.currentPlayer) {
				$s.currentPlayer.endTurn();
				var currentIdx = $s.currentPlayer.idx;
				$s.currentPlayer = currentIdx == $s.allPlayers.length ? $s.allPlayers[0] : $s.allPlayers[currentIdx];
			} else {
				$s.currentPlayer = $s.allPlayers[0];
			}
		};

		$s.quickStart = () => {
			// No need
			// $s.allPlayers.push(new Class.Player('David', $s.allPlayers.length + 1));
			// $s.allPlayers.push(new Class.Player('Mike', $s.allPlayers.length + 1));
			// $s.allPlayers.push(new Class.Player('Phil', $s.allPlayers.length + 1));
			// $s.allPlayers.push(new Class.Player('Susie', $s.allPlayers.length + 1));
			// $s.allPlayers.push(new Class.Player('Megan', $s.allPlayers.length + 1));
			// $s.changeCurrentPlayer();
		};

		$s.addNewPlayer = () => {
			// Doesn't make sense
			// $s.currentPlayer = new Class.Player($s.ff.newPlayerName, $s.allPlayers.length + 1);
			// $s.allPlayers.push($s.currentPlayer);
			// $s.ff.newPlayerName = '';
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
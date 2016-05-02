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

		function createNewUser() {
			var currentTime = moment().format(timeFormat);

			_.extend($s.currentUser, {
				createdDate: currentTime,
				name: $s.authData.facebook.displayName,
				rating: 1200,
				uid: $s.authData.uid,
				gender: $s.authData.facebook.cachedUserProfile.gender,
				firstName: $s.authData.facebook.cachedUserProfile.first_name,
				lastName: $s.authData.facebook.cachedUserProfile.last_name,
				picture: $s.authData.facebook.cachedUserProfile.picture.data.url,
				timezone: $s.authData.facebook.cachedUserProfile.timezone
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

		const timeFormat = 'YYYY-MM-DD HH:mm:ss';

		// add later for everyone seeing same cursor movement
		const cursorObj = FF.getFBObject('cursor');
		cursorObj.$bindTo($s, 'cursor');

		//	initialize scoped variables
		_.assign($s, {
			time: moment().format(timeFormat),
			allPlayers: [],
			allItems: IF.allItems,
			ff: {
				newPlayerName: ''
			},
			indianSupply: 8,
			cursor: {
				left: 0,
				top: 0
			},
			map: MAP.map
		});

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

		$s.quickStart = () => {
			$s.allPlayers.push(new Class.Player('David', $s.allPlayers.length + 1));
			$s.allPlayers.push(new Class.Player('Mike', $s.allPlayers.length + 1));
			$s.allPlayers.push(new Class.Player('Phil', $s.allPlayers.length + 1));
			$s.allPlayers.push(new Class.Player('Susie', $s.allPlayers.length + 1));
			$s.allPlayers.push(new Class.Player('Megan', $s.allPlayers.length + 1));
			$s.changeCurrentPlayer();
		};

		$s.fbLogin = () => {
			$s.authData = FF.facebookLogin();
			$s.currentUser = FF.getFBObject('users/' + authData.uId);

			if (!$s.currentUser.uid) {
				createNewUser();
			}
		};

		$s.addNewPlayer = () => {
			$s.currentPlayer = new Class.Player($s.ff.newPlayerName, $s.allPlayers.length + 1);
			$s.allPlayers.push($s.currentPlayer);
			$s.ff.newPlayerName = '';
		};

		$s.moveCursor = e => {
			$s.cursor.left = (e.pageX + 2) + 'px';
			$s.cursor.top = (e.pageY + 2) + 'px';
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

		//$s.activeGames = FF.getFBArray('activeGames');
		$s.activeGames = FF.getFBObject('activeGames');
		$s.activeGames.$loaded(() => {
			console.log('Firebase is working');
			$('.notices').text('Firebase is working!');
			$('body').addClass('facebook-available');
		});

		init();
	}
]);
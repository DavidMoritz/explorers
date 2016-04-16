mainApp.controller('MainCtrl', [
	'$scope',
	'$timeout',
	'$interval',
	'ItemFactory',
	'CardFactory',
	'MethodFactory',
	'FirebaseFactory',
	function MainCtrl($s, $timeout, $interval, IF, CF, MF, FF) {
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

		function Corp() {
			this.supplyBoats = [{
				cost: function cost() {
					return 0;
				},
				capacity: 2,
				content: []
			},{
				cost: function cost() {
					return this.content.length ? 1 : 0;
				},
				capacity: 3,
				content: []
			},{
				cost: function cost() {
					return this.content.length;
				},
				capacity: 5,
				content: []
			}];
			this.indianBoats = [{
				cost: function cost() {
					return 0;
				},
				capacity: 1,
				content: [{
					indian: 1
				}]
			},{
				cost: function cost() {
					return this.content.length;
				},
				capacity: 20,
				content: []
			}];
		}

		function Deck() {
			_.extend(this, {
				heldCards: _.extend({}, CF.startingCards),
				playedCards: [],
				cost: function cost() {
					return this.heldCards.length;
				}
			});
		}

		function Player(name, color) {
			/*
			 * Player has a name, a color, a deck, and a corp
			 */
			_.extend(this, {
				name: name,
				color: allColors.splice(-1)[0],
				corp: new Corp(),
				deck: new Deck(),
				idx: $s.allPlayers.length + 1
			});
		}

		function User() {
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

		var timeFormat = 'YYYY-MM-DD HH:mm:ss';
		var allColors = ['lightsalmon', 'orchid', 'lightgreen', 'lightblue', 'lightcoral'];

		// add later for everyone seeing same cursor movement
		// var cursorObj = FF.getFBObject('cursor');
		// cursorObj.$bindTo($s, 'cursor');

		//	initialize scoped variables
		_.assign($s, {
			time: moment().format(timeFormat),
			allPlayers: [],
			allChips: [],
			allItems: IF.allItems,
			ff: {
				newPlayerName: ''
			},
			cursor: {
				left: 0,
				top: 0
			}
		});

		$s.collect = function collect(item, added) {
			$s.currentPlayer.corp.supplyBoats.map(function mapBoats(boat) {
				if (boat.content.length < boat.capacity && !added) {
					boat.content.push(_.extend({}, item));
					added = true;
				}
			});
		};

		$s.quickStart = function quickStart() {
			$s.allPlayers.push(new Player('David'));
			$s.allPlayers.push(new Player('Mike'));
			$s.allPlayers.push(new Player('Phil'));
			$s.allPlayers.push(new Player('Susie'));
			$s.allPlayers.push(new Player('Megan'));
			$s.changeCurrentPlayer();
		};

		$s.fbLogin = function facebookLogin() {
			$s.authData = FF.facebookLogin();
			$s.currentUser = FF.getFBObject('users/' + authData.uId);

			if (!$s.currentUser.uid) {
				createNewUser();
			}
		};

		$s.addNewPlayer = function addNewPlayer() {
			$s.currentPlayer = new Player($s.ff.newPlayerName);
			$s.allPlayers.push($s.currentPlayer);
			$s.ff.newPlayerName = '';
		};

		$s.moveCursor = function moveCursor(e) {
			$s.cursor.left = (e.pageX + 2) + 'px';
			$s.cursor.top = (e.pageY + 2) + 'px';
		};

		$s.changeCurrentPlayer = function changeCurrentPlayer() {
			if ($s.currentPlayer) {
				var currentIdx = $s.currentPlayer.idx;
				$s.currentPlayer = currentIdx == $s.allPlayers.length ? $s.allPlayers[0] : $s.allPlayers[currentIdx];
			} else {
				$s.currentPlayer = $s.allPlayers[0];
			}
		};

		// $s.activeGames = FF.getFBArray('activeGames');
		// $s.activeGames.$loaded(function afterActiveGamesLoaded() {
		// 	console.log('Firebase is working');
		// 	$('.notices').text('Firebase is working!');
		// 	$('body').addClass('facebook-available');
		// });

		init();
	}
]);

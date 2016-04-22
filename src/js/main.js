mainApp.controller('MainCtrl', [
	'$scope',
	'$timeout',
	'$interval',
	'$uibModal',
	'ItemFactory',
	'BoatFactory',
	'CardFactory',
	'MapFactory',
	'MethodFactory',
	'FirebaseFactory',
	function MainCtrl($s, $timeout, $interval, $uibM, IF, BF, CF, MAP, MF, FF) {
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
			this.supplyBoats = new BF.startSupply();
			this.indianBoats = new BF.startIndian();
		}

		function Deck() {
			_.extend(this, {
				heldCards: new CF.startingCards(),
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
				space: findStartSpace(),
				idx: $s.allPlayers.length + 1,
				countIndians: function countIndians() {
					return this.corp.indianBoats.reduce(function reduceSize(total, boat) {
						return total + boat.content.length;
					}, 0);
				}
			});

			$s.addIndian(this);
		}

		function User() {
		}

		function findStartSpace() {
			var start = _.find(MAP.map, {special: 'start'});

			return _.indexOf(MAP.map, start);
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
		var cursorObj = FF.getFBObject('cursor');
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

		var payCost = function payCost(cost) {
			var tempCost = Object.create(cost);
			$s.currentPlayer.corp.supplyBoats.map(function mapBoats(boat) {
				boat.content.map(function mapItems(item) {
					if (tempCost[item.name] > 0) {
						tempCost[item.name]--;
						item.delete = true;
					}
				});
			});

			if (_.every(_.values(tempCost), function cost(cost) {
				return cost === 0;
			})) {
				$s.currentPlayer.corp.supplyBoats.map(function mapBoats(boat) {
					boat.content = boat.content.filter(function filterItems(item) {
						return !item.delete;
					});
				});

				return true;
			}
		};

		var collect = function collect(item, added) {
			$s.currentPlayer.corp.supplyBoats.map(function mapBoats(boat) {
				if (boat.content.length < boat.capacity && !added) {
					boat.content.push(Object.create(item));
					added = true;
				}
			});

			if (!added) {
				console.log('no space for that item');
			}
		};

		var travel = function travel(terrain) {
			var space = $s.currentPlayer.space;
			var nextSpace = MAP.map[space + 1];

			if (nextSpace.terrain == terrain || nextSpace.terrain == 'mixed') {
				console.log('You moved 1 space on to ' + nextSpace.terrain + ' terrain');
				$s.currentPlayer.space++;
			} else {
				console.log('You did not move off of your ' + MAP.map[space].terrain + ' terrain');
			}
		};

		var benefit = function benefit(benefit) {
			_.mapKeys(benefit, function mapKeys(amount, key) {
				for (var i = 0; i < amount; i++) {
					var item = _.find(IF.allItems, {name: key});

					if (item) {
						collect(item);
					} else if (key === 'indian') {
						$s.addIndian();
					} else if (key === 'mountain' || key === 'water') {
						travel(key);
					}
				}
			});
		};

		$s.camp = function camp() {
			var time = $s.currentPlayer.deck.heldCards.length;
			$s.currentPlayer.deck.heldCards = $s.currentPlayer.deck.heldCards.concat($s.currentPlayer.deck.playedCards);
			$s.currentPlayer.deck.playedCards = [];
			time = $s.currentPlayer.corp.supplyBoats.reduce(function reduce(time, boat) {
				return time + boat.cost();
			}, time);
			time = $s.currentPlayer.corp.indianBoats.reduce(function reduce(time, boat) {
				return time + boat.cost();
			}, time);
			console.log(time);
		};

		$s.open = function openModal() {
			var instance = $uibM.open({
				animation: true,
				templateUrl: 'strengthModal',
				controller: 'ModalInstanceCtrl',
				size: 'lg',
				resolve: {
					currentPlayer: function resolve() {
						return $s.currentPlayer;
					}
				}
			});

			instance.result.then(function result(currentPlayer) {
				$s.currentPlayer = currentPlayer;
			});
		};

		$s.playCard = function playCard(card, power) {
			$s.open();
			console.log(card);
			$s.currentPlayer.deck.playedCards.push(card);
			$s.currentPlayer.deck.heldCards = _.reject($s.currentPlayer.deck.heldCards, card);

			if (power.cost) {
				if (payCost(power.cost)) {
					benefit(power.benefit);
				} else {
					console.log('you cannot aford that power');
				}
			} else {
				benefit(power.benefit);
			}
		};

		$s.purchase = function purchase(item) {
			if (item.cost) {
				if (payCost(item.cost)) {
					collect(item);
				} else {
					console.log('you cannot aford that power');
				}
			}
		};

		$s.addIndian = function addIndian(player) {
			var added = $s.indianSupply === 0;
			player = player || $s.currentPlayer;

			player.corp.indianBoats.map(function mapBoats(boat) {
				if (boat.content.length < boat.capacity && !added) {
					boat.content.push(new IF.indian());
					added = true;
					$s.indianSupply--;
				}
			});
		};

		$s.addBoat = function addBoat(type, size) {
			if (payCost({wood: 3})) {
				var boatsArr = $s.currentPlayer.corp[type + 'Boats'];

				boatsArr.push(new BF[type + size]());
				$s.currentPlayer.corp[type + 'Boats'] = _.sortBy(boatsArr, 'capacity');

				if (type === 'indian') {
					$s.addIndian();
				}
			}
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

		//$s.activeGames = FF.getFBArray('activeGames');
		$s.activeGames = FF.getFBObject('activeGames');
		$s.activeGames.$loaded(function afterActiveGamesLoaded() {
			console.log('Firebase is working');
			$('.notices').text('Firebase is working!');
			$('body').addClass('facebook-available');
		});

		init();
	}
]);

mainApp.controller('ModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance, currentPlayer) {
	$scope.currentPlayer = currentPlayer;

	$scope.ok = function ok() {
		$uibModalInstance.close($scope.currentPlayer);
	};

	$scope.cancel = function cancel() {
		$uibModalInstance.dismiss('cancel');
	};
});
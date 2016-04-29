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

		class Corp {
			constructor() {
				this.supplyBoats = new BF.startSupply();
				this.indianBoats = new BF.startIndian();
			}
			get cost() {
				var time = this.supplyBoats.reduce((time, boat) => time + boat.cost(), 0);

				return this.indianBoats.reduce((time, boat) => time + boat.cost(), time);
			}
			noPay() {
				this.supplyBoats.map(boat => {
					boat.content.map(item => {
						item.delete = false;
					});
				});
			}
		}

		class Deck {
			constructor() {
				this.cards = new CF.startingCards();
				this.activeCardId = '';
			}
			get activeCard() {
				return _.find(this.cards, {id: this.activeCardId});
			}
			get cost() {
				return this.heldCards.length;
			}
			get heldCards() {
				return this.cards.filter(card => !card.played);
			}
			get playedCards() {
				return this.cards.filter(card => card.played);
			}
			reset() {
				this.cards.map(card => card.played = false);
			}
			play(card) {
				var idx = _.findIndex(this.cards, card);

				this.cards[idx].played = true;
			}
		}

		class Player {
			/*
			 * Player has a name, a color, a deck, and a corp
			 */
			constructor(name, color) {
				this.name = name;
				this.color = color || allColors.splice(-1)[0];
				this.corp = new Corp();
				this.deck = new Deck();
				this.space = findStartSpace();
				this.idx = $s.allPlayers.length + 1;
				$s.addIndian(this);
			}
			get cost() {
				return this.deck.cost + this.corp.cost;
			}
			get strengthAvailable() {
				return this.playStrength > this.deck.activeCard.plays;
			}
			camp() {
				this.deck.reset();

				if (this.space <= this.cost) {
					this.space = 0;
				} else {
					this.space -= this.cost;
					checkForScouts(-1);
				}
			}
			goBack(time) {
			}
			countIndians() {
				return this.corp.indianBoats.reduce((total, boat) => total + boat.content.length, 0);
			}
			useAbility(ability) {
				if (this.strengthAvailable) {
					if (ability.cost) {
						if (this.payCost(ability.cost)) {
							benefit(ability.benefit);
						} else {
							console.log('you cannot aford that ability');
						}
					} else {
						benefit(ability.benefit);
					}
				}
			}
			playCard(card) {
				this.deck.play(card);
				this.deck.activeCardId = card.id;
				openModal();
			}
			payCost(cost) {
				var tempCost = Object.create(cost);
				this.corp.supplyBoats.map(boat => {
					boat.content.map(item => {
						if (tempCost[item.name] > 0) {
							tempCost[item.name]--;
							item.delete = true;
						}
					});
				});

				if (_.every(_.values(tempCost), cost => cost === 0)) {
					this.corp.supplyBoats.map(boat => {
						boat.content = boat.content.filter(item => !item.delete);
					});

					return true;
				} else {
					this.corp.noPay();
				}
			}
		}

		class User {
			constructor() {}
		}

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

		function collect(item, added) {
			$s.currentPlayer.corp.supplyBoats.map(boat => {
				if (boat.content.length < boat.capacity && !added) {
					boat.content.push(Object.create(item));
					added = true;
				}
			});

			if (!added) {
				console.log('no space for that item');
			}
		}

		function travel(terrain) {
			var space = $s.currentPlayer.space;
			var nextSpace = MAP.map[space + 1];

			if (nextSpace.terrain == terrain || nextSpace.terrain == 'mixed') {
				console.log('You moved 1 space on to ' + nextSpace.terrain + ' terrain');
				$s.currentPlayer.space++;
			} else {
				console.log('You did not move off of your ' + MAP.map[space].terrain + ' terrain');
			}
		}

		function checkForScouts(direction) {
			var dupes = $s.allPlayers.filter(
				player => (player.name != $s.currentPlayer.name) && (player.space == $s.currentPlayer.space)
			);

			if (dupes.length) {
				$s.currentPlayer.space += direction;
				checkForScouts(direction);
			}
		}

		function benefit(benefit) {
			$s.currentPlayer.activeCard.plays++;
			_.mapKeys(benefit, (amount, key) => {
				for (let i = 0; i < amount; i++) {
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
			checkForScouts(1);
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
		const allColors = ['lightsalmon', 'orchid', 'lightgreen', 'lightblue', 'lightcoral'];

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

		$s.purchase = item => {
			if (item.cost) {
				if ($s.currentPlayer.payCost(item.cost)) {
					collect(item);
				} else {
					console.log('you cannot aford that ability');
				}
			}
		};

		$s.addIndian = player => {
			var added = $s.indianSupply === 0;
			player = player || $s.currentPlayer;

			player.corp.indianBoats.map(boat => {
				if (boat.content.length < boat.capacity && !added) {
					boat.content.push(new IF.indian());
					added = true;
					$s.indianSupply--;
				}
			});
		};

		$s.addBoat = (type, size) => {
			if ($s.currentPlayer.payCost({wood: 3})) {
				var boatsArr = $s.currentPlayer.corp[type + 'Boats'];

				boatsArr.push(new BF[type + size]());
				$s.currentPlayer.corp[type + 'Boats'] = _.sortBy(boatsArr, 'capacity');

				if (type === 'indian') {
					$s.addIndian();
				}
			}
		};

		$s.quickStart = () => {
			$s.allPlayers.push(new Player('David'));
			$s.allPlayers.push(new Player('Mike'));
			$s.allPlayers.push(new Player('Phil'));
			$s.allPlayers.push(new Player('Susie'));
			$s.allPlayers.push(new Player('Megan'));
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
			$s.currentPlayer = new Player($s.ff.newPlayerName);
			$s.allPlayers.push($s.currentPlayer);
			$s.ff.newPlayerName = '';
		};

		$s.moveCursor = e => {
			$s.cursor.left = (e.pageX + 2) + 'px';
			$s.cursor.top = (e.pageY + 2) + 'px';
		};

		$s.changeCurrentPlayer = () => {
			if ($s.currentPlayer) {
				var currentIdx = $s.currentPlayer.idx;
				$s.currentPlayer = currentIdx == $s.allPlayers.length ? $s.allPlayers[0] : $s.allPlayers[currentIdx];
			} else {
				$s.currentPlayer = $s.allPlayers[0];
			}
			$s.currentPlayer.playStrength = 0;
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
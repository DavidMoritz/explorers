mainApp.factory('FirebaseFactory', [
	'$firebaseArray',
	'$firebaseObject',
	function FirebaseFactory($fbArray, $fbObject) {
		'use strict';
		var FB = null;

		return {
			// Firebase methods
			getFB: function getFB(childPath) {
				if (!FB) {
					FB = new Firebase('https://explorers-game.firebaseio.com/');
				}

				return childPath ? FB.child(childPath) : FB;
			},

			getFBArray: function getFBArray(childPath) {
				return $fbArray(this.getFB(childPath));
			},

			getFBObject: function getFBObject(childPath) {
				return $fbObject(this.getFB(childPath));
			},

			getAuth: function getFBAuth(childPath) {
				return $firebaseAuth(this.getFB(childPath));
			},

			setFB: function setFB(childPath, value) {
				var ref = this.getFB(childPath);
				ref.set(value);

				return false;
			},

			facebookLogin: function facebookLogin(err, success) {
				var ref = this.getFB();
				ref.authWithOAuthPopup('facebook', function facebookOAuth(error, authData) {
					if (error) {
						err(error);
					} else {
						success(authData);
					}
				}, {scope: 'user_friends'});
			}
		};
	}
]);

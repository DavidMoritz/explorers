mainApp.factory('FirebaseFactory', [
	'$firebaseArray',
	'$firebaseObject',
	function FirebaseFactory($fbArray, $fbObject) {
		'use strict';
		var FB = null;
		var FF = {
			// Firebase methods
			getFB: childPath => {
				if (!FB) {
					FB = new Firebase('https://explorers-game.firebaseio.com/');
				}

				return childPath ? FB.child(childPath) : FB;
			},

			getFBArray: childPath => $fbArray(FF.getFB(childPath)),

			getFBObject: childPath => $fbObject(FF.getFB(childPath)),

			getAuth: childPath => $firebaseAuth(FF.getFB(childPath)),

			setFB: (childPath, value) => {
				var ref = FF.getFB(childPath);
				ref.set(value);

				return false;
			},

			facebookLogin: (err, success) => {
				var ref = FF.getFB();
				ref.authWithOAuthPopup('facebook', (error, authData) => {
					if (error) {
						err(error);
					} else {
						success(authData);
					}
				}, {scope: 'user_friends'});
			}
		};

		return FF;
	}
]);

mainApp.controller('ModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance, currentPlayer) {
	$scope.currentPlayer = currentPlayer;

	$scope.addStrength = function addStrength(card) {
		if ($scope.currentPlayer.playStrength < 3) {
			$scope.currentPlayer.playStrength += card.strength;
			$scope.currentPlayer.deck.play(card);

			if ($scope.currentPlayer.playStrength > 3) {
				$scope.currentPlayer.playStrength = 3;
			}
		} else {
			console.log('cannot go above 3');
		}
	};

	$scope.playIndian = function addIndian(removed) {
		if ($scope.currentPlayer.playStrength < 3) {
			$scope.currentPlayer.corp.indianBoats.reverse();
			$scope.currentPlayer.corp.indianBoats.map(function mapBoats(boat) {
				if (boat.content.length && !removed) {
					boat.content.splice(-1);
					removed = true;
					$scope.currentPlayer.playStrength++;
				}
			});
			$scope.currentPlayer.corp.indianBoats.reverse();
		} else {
			console.log('cannot go above 3');
		}
	};

	$scope.ok = function ok() {
		$uibModalInstance.close($scope.currentPlayer);
	};

	$scope.cancel = function cancel() {
		$uibModalInstance.dismiss('cancel');
	};
});
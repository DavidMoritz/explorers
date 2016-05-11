mainApp.controller('ModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance, currentPlayer) {
	$scope.currentPlayer = currentPlayer;

	$scope.addStrength = cardId => {
		$s.addEvent({
			name: 'addStrength',
			card: cardId
		});
	};

	$scope.useAbility = idx => {
		$s.addEvent({
			name: 'useAbility',
			idx: idx
		});
	};

	$scope.addIndian = () => {
		$s.addEvent('addIndianToStrength');
	};

	$scope.cancel = () => {
		$uibModalInstance.dismiss('cancel');
	};
});
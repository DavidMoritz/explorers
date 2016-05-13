mainApp.controller('ModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance, currentPlayer) {
	$scope.currentPlayer = currentPlayer;

	$scope.addStrength = cardId => {
		$s.addEvent({
			name: 'addStrength',
			cardId: cardId
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

	$s.closeModal = () => {
		$uibModalInstance.dismiss('cancel');
	};
});
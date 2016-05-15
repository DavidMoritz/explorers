mainApp.controller('StrengthModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance, currentPlayer) {
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

	$s.closeStrengthModal = () => {
		$uibModalInstance.dismiss('cancel');
	};
});

mainApp.controller('RecruitModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance, currentPlayer, journal) {
	$scope.currentPlayer = currentPlayer;
	$scope.journal = journal;

	$s.closeRecuitModal = () => {
		$uibModalInstance.dismiss('cancel');
	};
});
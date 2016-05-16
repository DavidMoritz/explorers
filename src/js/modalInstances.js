mainApp.controller('StrengthModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance) {
	$scope.currentPlayer = $s.currentPlayer;

	$scope.addStrength = card => {
		$s.addEvent({
			name: 'addStrength',
			cardId: card.id
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
});

mainApp.controller('RecruitModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance) {
	$scope.currentPlayer = $s.currentPlayer;
	$scope.journal = $s.journal;

	$scope.recruitCard = card => {
		$s.addEvent({
			name: 'recruitCard',
			cardId: card.id,
			idx: $s.journal.indexOf(card)
		});
	};
});

mainApp.controller('BoardModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance, CardFactory) {
	$scope.currentPlayer = $s.currentPlayer;
	$scope.boardSpaces = CardFactory.boardSpaces;

	$scope.clickBoardSpace = space => {
		console.log(space);
	};
});
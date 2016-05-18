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
			name: 'openRecruitPayment',
			card: card,
			fur: $s.journal.indexOf(card) + 1
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

mainApp.controller('RecruitPaymentModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance) {
	$scope.recruitCard = $s.recruitCard;
	$scope.currentPlayer = $s.currentPlayer;

	$scope.recruitPayment = card => {
		$s.addEvent({
			name: 'recruitPayment',
			cardId: card.id
		});
	};
});
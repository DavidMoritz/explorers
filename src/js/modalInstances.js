mainApp.controller('StrengthModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance) {
	$scope.currentPlayer = $s.currentPlayer;
	$scope.activeGame = $s.activeGame;

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
	$scope.activeGame = $s.activeGame;
	$scope.journal = $s.journal;

	$scope.recruitCard = card => {
		$s.addEvent({
			name: 'openRecruitPayment',
			cardId: card.id,
			strength: card.strength,
			fur: $s.journal.indexOf(card) + 1
		});
	};
});

mainApp.controller('BoardModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance, CardFactory) {
	$scope.currentPlayer = $s.currentPlayer;
	$scope.activeGame = $s.activeGame;
	$scope.boardSpaces = CardFactory.boardSpaces;

	$scope.clickBoardSpace = space => {
		console.log(space);
	};
});

mainApp.controller('RecruitPaymentModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance) {
	$scope.recruitCard = $s.recruitCard;
	$scope.currentPlayer = $s.currentPlayer;
	$scope.activeGame = $s.activeGame;

	$scope.recruitPayment = card => {
		if (card) {
			$s.addEvent({
				name: 'recruitPayment',
				cardId: card.id
			});
		} else {
			$s.addEvent('recruitPayment');
		}
		$s.addEvent('closeModal');
	};
});
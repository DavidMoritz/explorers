mainApp.controller('StrengthModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance) {
	$scope.currentPlayer = $s.currentPlayer;
	$scope.activeGame = $s.activeGame;
	$scope.addEvent = $s.addEvent;

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
	$scope.addEvent = $s.addEvent;
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
	$scope.addEvent = $s.addEvent;
	$scope.boardSpaces = CardFactory.boardSpaces.map(space => {
		space.contents = [];
		space.max = space.max || 1;
		space.allow = space.allow || 1;

		return space;
	});

	$scope.clickBoardSpace = space => {
		if ($s.currentPlayer.takenMainAction) {
			$s.notify('You have already taken a main action');
		} else if ($s.currentPlayer.indianCount) {
			if (space.contents.length < space.max) {
				space.contents.push($s.currentPlayer.corp.payIndian());
				$s.currentPlayer.takenMainAction = true;
				$s.addEvent(space.event);
				$s.addEvent('closeModal');
			} else {
				$s.notify('That space is full');
			}			
		} else {
			$s.notify('You need an indian to use that space');
		}
	};
});

mainApp.controller('RecruitPaymentModalInstanceCtrl', function ModalCtrl($scope, $uibModalInstance) {
	$scope.recruitCard = $s.recruitCard;
	$scope.currentPlayer = $s.currentPlayer;
	$scope.activeGame = $s.activeGame;
	$scope.addEvent = $s.addEvent;

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
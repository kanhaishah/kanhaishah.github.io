app.controller('fieldModalController', ['$uibModalInstance', '$scope', 'profile', function($uibModalInstance, $scope, profile){
    $scope.selectedItem = {};
    $scope.selectedItem.selectedProperty = 'Hostel';
    $scope.profile = profile;
    $scope.addFields = function () {
        $uibModalInstance.close($scope.selectedItem);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
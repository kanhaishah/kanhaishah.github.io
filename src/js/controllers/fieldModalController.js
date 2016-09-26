app.controller('fieldModalController', ['$uibModalInstance', '$scope', 'profile', 'utility', function($uibModalInstance, $scope, profile, utility){
    $scope.selectedItem = {};
    $scope.selectedItem.selectedProperty = 'Hostel';
    $scope.profile = profile;
    $scope.addFields = function () {
        $uibModalInstance.close($scope.selectedItem);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.isFieldNameValid = function() {
        return utility.isFieldAlreadyPresent($scope.selectedItem.name, $scope.profile.fields, 'name');
    }
}]);

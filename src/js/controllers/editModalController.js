app.controller('editModalController', ['$uibModalInstance', '$scope', 'profile', 'utility', 'profiles', function($uibModalInstance, $scope, profile, utility, profiles){
    $scope.profile = angular.copy(profile);
    $scope.profiles = angular.copy(profiles);
    $scope.selectedName = $scope.profile.name;
    $scope.saveChanges = function () {
        $uibModalInstance.close($scope.profile);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.isFieldNameValidForEdit = function() {
       return utility.isFieldAlreadyPresent($scope.profile.nameVal, $scope.profile.fields, 'name');
    }
}]);

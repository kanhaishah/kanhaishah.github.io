app.controller('sectionModalController', ['$uibModalInstance', '$scope', 'profiles', 'utility', function($uibModalInstance, $scope, profiles, utility){
    $scope.profiles = angular.copy(profiles);
    if($scope.profiles.length) {
        $scope.profile = angular.copy($scope.profiles[0]);
    }else {
        $scope.profile = {};
        $scope.profile.direction = 'above';
    }

    $scope.profile.nameVal = '';

    $scope.addSection = function () {
        $uibModalInstance.close(angular.copy($scope.profile));
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.isSectionNameValid = function() {
        return utility.isFieldAlreadyPresent($scope.profile.nameVal, $scope.profiles, 'name');
    }
}]);

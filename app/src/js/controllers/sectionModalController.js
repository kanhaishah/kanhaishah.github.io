app.controller('sectionModalController', ['$uibModalInstance', '$scope', 'profiles', function($uibModalInstance, $scope, profiles){
    $scope.profiles = profiles;
    $scope.selectedItem = {};
    $scope.selectedItem.profile = $scope.profiles[0];
    $scope.selectedItem.direction = 'above';
    $scope.addFields = function () {
        $uibModalInstance.close($scope.selectedItem);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

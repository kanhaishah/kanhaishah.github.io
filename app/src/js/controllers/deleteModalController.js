app.controller('deleteModalController', ['$uibModalInstance', '$scope', function($uibModalInstance, $scope){
    $scope.delete = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

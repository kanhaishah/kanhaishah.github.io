app.controller('profileController', ['$scope', 'profile', '$uibModal', '$document', '$timeout', function($scope, profile, $uibModal, $document, $timeout){
    $scope.profiles = profile.getProfiles();
    $scope.isParentDraggable = true;
    $scope.isChildDraggable = true;
    $scope.backedUpProfiles = [];
    $scope.onDropComplete = function (index, obj, evt) {
            var otherObj = $scope.profiles[index];
            var otherIndex = $scope.profiles.indexOf(obj);
            $scope.profiles[index] = obj;
            $scope.profiles[otherIndex] = otherObj;
    };

    $scope.onDropCompleteField = function (index, obj, evt) {
        var targetIndex = index;
        var targetNode = JSON.parse(evt.element[0].attributes.getNamedItem('node-name').nodeValue);
        var srcIndex = _.findIndex(obj.fields, function(field) { return field.name === targetNode.name; });
        var tempNode = obj.fields[srcIndex];
        obj.fields[srcIndex] = obj.fields[targetIndex];
        obj.fields[targetIndex] = tempNode;
    };
    $scope.addFields = function(index) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'fieldModal.html',
            controller: 'fieldModalController',
            windowClass: 'add-field-modal',
            appendTo: $document.find('#right-sidebar'),
            resolve: {
                profile: function () {
                    return $scope.profiles[index];
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.profiles[index].fields.push(selectedItem);
        }, function () {
            $log.info('modal-component dismissed at: ' + new Date());
        });
    };
    $scope.removeField = function(field, profile) {
        profile.fields.splice(profile.fields.indexOf(field), 1);
    };
    $scope.addNewProfile = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'section-title',
            ariaDescribedBy: 'section-body',
            templateUrl: 'sectionModal.html',
            controller: 'sectionModalController',
            windowClass: 'section-modal',
            appendTo: $document.find('#right-sidebar'),
            resolve: {
                profiles: function () {
                    return $scope.profiles;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            var isAbove = (selectedItem.direction === 'above');
            profile.addProfile(isAbove, (selectedItem.profile) ? selectedItem.profile.name : '', selectedItem.sectionName);
            $scope.profiles = profile.getProfiles();
        });

    };

    $scope.deleteSection = function(profileToDelete) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'delete-title',
            ariaDescribedBy: 'delete-body',
            templateUrl: 'deleteModal.html',
            controller: 'deleteModalController',
            windowClass: 'delete-modal',
            appendTo: $document.find('#right-sidebar')
        });

        modalInstance.result.then(function () {
            var index = _.findIndex($scope.profiles, function(profile) {
                return (profile.name === profileToDelete.name);
            });
            $scope.profiles.splice(index,1);

            profile.setProfiles($scope.profiles);
        });

    };


}]);

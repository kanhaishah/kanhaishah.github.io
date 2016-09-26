app.controller('profileController', ['$scope', 'profile', '$uibModal', '$document', 'utility',  function($scope, profile, $uibModal, $document, utility){
    $scope.profiles = profile.getProfiles();
    $scope.sortableOptionsParent = {
        stop: function() {
            $scope.shuffleProfiles();
        }
    };

    $scope.shuffleProfiles = function() {
        if($scope.profiles.length === 1) return;
        $scope.profiles.forEach(function(profile, i){
                if(i === $scope.profiles.length - 1) {
                    profile.direction = 'below';
                    profile.name = $scope.profiles[i-1].nameVal;
                }else {
                    profile.direction = 'above';
                    profile.name = $scope.profiles[i + 1].nameVal;
                }
        });
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

    $scope.editSection = function(index) {
        var resolve = {
            profile: function () {
                return $scope.profiles[index];
            },
            profiles: function () {
                return $scope.profiles;
            }
        };
        var modalInstance = utility.instantiateModal(utility.createModalSettingsObject('edit-title', 'edit-body', 'editModal.html', 'editModalController', $document.find('#right-sidebar'),
            'edit-field-modal', resolve));



        modalInstance.result.then(function (profileVal) {
            profile.editProfile(profileVal, index);
            $scope.profiles = profile.getProfiles();
            $scope.shuffleProfiles();
        });

    };
    $scope.addSection = function() {
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
            if(!$scope.profiles.length) {
                profile.addProfile(true, selectedItem.nameVal, selectedItem.nameVal);
            }else {
                profile.addProfile(isAbove, selectedItem.nameVal, selectedItem.name);
            }

            $scope.profiles = profile.getProfiles();
            $scope.shuffleProfiles();
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
            $scope.profiles = profile.getProfiles();
            $scope.shuffleProfiles();
        });

    };


}]);

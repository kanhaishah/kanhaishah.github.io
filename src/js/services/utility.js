app.service('utility', ['$uibModal', function($uibModal) {
    var that = this;
    this.isFieldAlreadyPresent = function(valueToVerify, list, property) {
        if(!list.length) return true;
        var index = _.findIndex(list, function(profile){
            return (profile[property] === valueToVerify);
        });
        return (index < 0) ? true : false;
    };


    this.instantiateModal = function(modalSettings) {
        return $uibModal.open(modalSettings);
    };

    this.createModalSettingsObject = function(ariaLabelledBy, ariaDescribedBy, templateUrl, controller, appendTo, windowClass, resolve) {
      var modalSettings = {};
      modalSettings.animation = true;
      modalSettings.ariaLabelledBy = ariaLabelledBy;
      modalSettings.ariaDescribedBy = ariaDescribedBy;
      modalSettings.templateUrl = templateUrl;
      modalSettings.controller = controller;
      modalSettings.appendTo = appendTo;
      modalSettings.windowClass = windowClass;
      modalSettings.resolve = resolve;
      return modalSettings;
    };


}]);

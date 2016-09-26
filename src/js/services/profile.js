app.service('profile', ['profileValue', function(profileValue) {
    var that = this;
    this.profiles = profileValue;
    this.getProfiles = function () {
        return this.profiles;
    };
    this.createProfileObject = function(sectionName, reference, direction) {
        return {
            'nameVal' : sectionName,
            'name' : reference,
            'fields' : [],
            'direction': direction
        }
    };

    this.addProfile = function(isAbove, sectionName, reference) {
        var profile = that.createProfileObject(sectionName, reference, (isAbove) ? 'above' : 'below');
        if(!this.profiles.length) {
            this.profiles.push(profile);
            return;
        }
        var index = _.findIndex(this.profiles, function(profile){
           return(profile.nameVal === reference);
        });

        (isAbove) ? this.profiles.splice(index, 0, profile) : this.profiles.splice(index + 1, 0, profile);
    };

    this.setProfiles = function(profiles) {
        this.profiles = profiles;
    };

    this.editProfile = function(profileObj, index) {
        this.profiles.splice(index, 1);
        var index = _.findIndex(this.profiles, function(profile){
            return(profile.nameVal === profileObj.name);
        });
        (profileObj.direction === 'above') ? this.profiles.splice(index, 0, profileObj) : this.profiles.splice(index + 1, 0, profileObj);

    };
}]);

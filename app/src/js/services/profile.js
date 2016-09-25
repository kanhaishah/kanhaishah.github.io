app.service('profile', ['profileValue', function(profileValue) {
    var that = this;
    this.profiles = profileValue;
    this.getProfiles = function () {
        return this.profiles;
    };
    this.createProfileObject = function(sectionName) {
        return {
            'name' : sectionName,
            'fields' : []
        }
    };

    this.addProfile = function(isAbove, profileName, sectionName) {
        var profile = that.createProfileObject(sectionName);
        if(!this.profiles.length) {
            this.profiles.push(profile);
            return;
        }
        var index = _.findIndex(this.profiles, function(profile){
           return(profile.name === profileName);
        });

        (isAbove) ? this.profiles.splice(index, 0, profile) : this.profiles.splice(index + 1, 0, profile)
    };

    this.setProfiles = function(profiles) {
        this.profiles = profiles;
    };
}]);

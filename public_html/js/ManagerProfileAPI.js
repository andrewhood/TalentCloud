ManagerProfileAPI = {};

ManagerProfileAPI.ManagerProfile = function(){
    this.user_id = null,
    this.manager_profile_id = null;
    this.department = null;
    this.position = null;
    this.branch_id = null;
    this.division_id = null;
    this.twitter = null;
    this.linkedin = null;
    
    this.locale_id = null;
    this.about_me = null;
    this.proud = null;
    this.lead_style = null;
    this.employee_learning = null;
    this.expectations = null;
    this.review_options = null;
    this.stay_late = null;
    this.engagement = null;
    this.development_opportunities = null;
    this.low_value_work_requests = null;
    this.work_experience = null;
    this.education = null;
};

/**
 * 
 * @param {XMLHttpRequest} response - returned from http request
 * @return {MangagerProfileAPI.ManagerProfile}
 */
ManagerProfileAPI.parseManagerProfileResponse = function(response) {
    var manager_profile_with_details_json = JSON.parse(response);
    
    var manager_profile = manager_profile_with_details_json.manager_profile;
    var manager_profile_details = manager_profile_with_details_json.manager_profile_details;
    
    profile = new ManagerProfileAPI.ManagerProfile();
    profile.user_id = manager_profile.user_id;
    profile.manager_profile_id = manager_profile.user_manager_profile_id;
    profile.department = manager_profile.user_manager_profile_department;
    profile.position = manager_profile.user_manager_profile_position;
    profile.branch_id = manager_profile.user_manager_profile_branch_id;
    profile.division_id = manager_profile.user_manager_profile_division_id;
    profile.twitter = manager_profile.user_manager_profile_twitter;
    profile.linkedin = manager_profile.user_manager_profile_linkedin;
    
    profile.locale_id = manager_profile_details.locale_id;
    profile.about_me = manager_profile_details.user_manager_profile_details_aboutme;
    profile.accomplishment = manager_profile_details.user_manager_profile_details_proud;
    profile.lead_style = manager_profile_details.user_manager_profile_details_lead_style;
    profile.employee_learning = manager_profile_details.user_manager_profile_details_emp_learn;
    profile.expectations = manager_profile_details.user_manager_profile_details_expectations;
    profile.review_options = manager_profile_details.user_manager_profile_review_options;
    profile.stay_late = manager_profile_details.user_manager_profile_staylate;
    profile.engagement = manager_profile_details.user_manager_profile_engage;
    profile.development_opportunities = manager_profile_details.user_manager_profile_devops;
    profile.low_value_work_requests = manager_profile_details.user_manager_profile_lvwrequests;
    profile.work_experience = manager_profile_details.user_manager_profile_work_experience;
    profile.education = manager_profile_details.user_manager_profile_education;
    
    return profile;
};

ManagerProfileAPI.showManagerProfile = function(user_id) {
    var stateInfo = {pageInfo: 'manager_profile', pageTitle: 'Talent Cloud: Manager Profile'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#ManagerProfile/' + user_id);
    
    TalentCloudAPI.hideAllContent();
    var managerProfileSection = document.getElementById('managerProfileSection');
    managerProfileSection.classList.remove('hidden');
    
    DataAPI.getManagerProfile(user_id, ManagerProfileAPI.populateManagerProfile);
}

ManagerProfileAPI.populateManagerProfile = function(response) {
    var profile = ManagerProfileAPI.parseManagerProfileResponse(response);
    
    var user_id = document.getElementById("managerProfile_userId");
    user_id.value = profile.user_id;
    
    var manager_id = document.getElementById("managerProfile_managerProfileId");
    manager_id.value = profile.manager_profile_id;

    //var firstName = document.getElementById("managerProfileFirstName");
    //firstName.innerText = manager_

    //var last_updated = document.getElementById("profileLastUpdated");
    //last_updated.value = JobSeekerAPI.jobSeekerProfile.last_updated;

    var position = document.getElementById("managerProfilePosition");
    position.innerHTML = profile.position;
    
    var department = document.getElementById("managerProfileDepartment");
    department.innerHTML = profile.department;

    var twitter_link = document.getElementById("managerProfileTwitterLink");
    var twitter_link_wrapper = document.getElementById("managerProfileTwitterLinkWrapper");
    if (profile.twitter == null || profile.twitter == "") {
        twitter_link_wrapper.classList.add("hidden");
        twitter_link.href = "javascript:void(0)";
    } else {
        twitter_link_wrapper.classList.remove("hidden");
        twitter_link.href = ManagerProfileAPI.twitterUsernameToLink(profile.twitter);
    }

    var linkedin_link = document.getElementById("managerProfileLinkedinLink");
    var linkedin_link_wrapper = document.getElementById("managerProfileLinkedinLinkWrapper");
    if (profile.linkedin == null || profile.linkedin == "") {
        linkedin_link_wrapper.classList.add("hidden");
        linkedin_link.href = "#";
    } else {
        linkedin_link_wrapper.classList.remove("hidden");
        linkedin_link.href = ManagerProfileAPI.linkedInHandleToLink(profile.linkedin);
    } 
    
    document.getElementById("managerProfileAboutMe").innerHTML = profile.about_me;
    document.getElementById("managerProfileAccomplishment").innerHTML = profile.accomplishment;
    document.getElementById("managerProfileLeadershipStyle").innerHTML = profile.lead_style;
    docuement.getElementById("managerProfileExpectations").innerHTML = profile.expectations;

};

ManagerProfileAPI.twitterUsernameToLink = function(twitterUsername) {
    if (twitterUsername.startsWith('@')) {
        return "https://twitter.com/" + twitterUsername.substring(1);
    } else {
        return "https://twitter.com/" + twitterUsername;
    }
};

ManagerProfileAPI.linkedInHandleToLink = function(linkedInHandle) {
    return "https://www.linkedin.com/in/"+linkedInHandle;
}


/**
 @module PushClient

 */

//Dependencies

const axios = require("axios").create({
  baseURL: "https://cp.pushwoosh.com/json/1.3",
  headers: { "Content-Type": "application/json" }
});

/**
 Pushwoosh API Client
 @constructor
 @param {string} application - The application ID
 @param {string} auth - The auth token, as seen in the Pushwoosh Dashboard
 */

function PushClient(application, auth) {
  //Required client config
  if (!application || !auth) {
    throw "RestClient requires an APP ID and Auth Token set explicitly ";
  } else {
    //if auth token/SID passed in manually, trim spaces
    this.application = application.replace(/ /g, "");
    this.auth = auth;
  }
}

/**
create a push notification

 @param {object} notification - Message to Delete
 */
PushClient.prototype.createMessage = function(notification) {
  return this.request("/createMessage", {
    notifications: [notification]
  });
};

/**
Deletes a push notification

 @param {string} message - Message to Delete
 */
PushClient.prototype.deleteMessage = function(message) {
  return this.request("/deleteMessage", {
    message
  });
};

/**
 Make an authenticated request against the Pushwoosh backend.

 @param {string} url - url to call
 @param {object} request - options to include or override inside the data request
 @param {object} options - options for HTTP request
 */

PushClient.prototype.request = function(url, request, options = {}) {
  return axios.request({
    url,
    method: "post",
    ...options,
    data: {
      request: { auth: this.auth, application: this.application, ...request }
    }
  });
};

module.exports = PushClient;

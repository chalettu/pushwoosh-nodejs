/**
 @module PushClient

 */

//Dependencies
var Q = require('q'),
  https = require('https');

//REST API Config Defaults
var defaultHost = 'cp.pushwoosh.com',
  defaultApiVersion = '1.3';
var defaultConfig={
  "application":"",
  "auth":"",
  "notifications":[]
};

/**
 Pushwoosh API Client
 @constructor
 @param {string} appid - The application ID
 @param {string} tkn - The auth token, as seen in the Pushwoosh Dashboard
 @param {object} options (optional) - optional config for the REST client
 */

function PushClient(appid, tkn, options) {
  //Required client config
  if (!appid || !tkn) {

      throw 'RestClient requires an APP ID and Auth Token set explicitly ';
  }
  else {
    //if auth token/SID passed in manually, trim spaces
    this.appid = appid.replace(/ /g,'');
    this.apiToken=tkn;

  }

  //Optional client config
  options = options || {};
  this.host = options.host || defaultHost;
  this.apiVersion = options.apiVersion || defaultApiVersion;
  this.timeout = options.timeout || 31000; // request timeout in milliseconds
  defaultConfig.application=this.appid;
  defaultConfig.auth=this.apiToken;

  this.sendMessage=function(options){

    var client=this;
    var deferred = Q.defer();
    var sendOptions=defaultConfig;
    sendOptions.notifications.push(options);

    client.request(sendOptions,"createMessage").then(function(data){
      console.log(data);
      deferred.resolve(data);

    },function(err){console.log(err)});
    return deferred.promise;
  };
}
/**
Deletes a push notification

 @param {string} messageId - Message to Delete
 */
PushClient.prototype.deleteMessage=function(messageId){

  var client=this;
  var deferred = Q.defer();
  var sendOptions={'auth':client.apiToken,'message':messageId};
console.log(sendOptions);
  client.request(sendOptions,"deleteMessage").then(function(data){
    console.log(data);
    deferred.resolve(data);

  },function(err){console.log(err)});
  return deferred.promise;
};


/**
 Make an authenticated request against the Pushwoosh backend.

 @param {object} options - options for HTTP request
 @param {string} url - url to call
 - @param {object} error - an error object if there was a problem processing the request
 - @param {object} data - the JSON-parsed data
 */

PushClient.prototype.request = function (options, url) {
  var client = this,
    deferred = Q.defer();
  var json_request={"request":options};

  var error = null;

  var jsonString = JSON.stringify(json_request);
  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': jsonString.length
  };

  var httpOptions = {
    host: this.host,
    path: '/json/' + this.apiVersion+'/'+url,
    method: 'POST',
    headers: headers
  };

  var req = https.request(httpOptions, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
   //   console.log(responseString);
      var resultObject = JSON.parse(responseString);
        deferred.resolve(resultObject);
    });


  });

  req.on('error', function(e) {
    // TODO: handle error.
    console.log(e);
    deferred.reject("error");
  });
  req.write(jsonString);
  req.end();
  return deferred.promise;

};

module.exports = PushClient;


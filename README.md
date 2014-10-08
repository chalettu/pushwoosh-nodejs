Pushwoosh
================

This is a node module I created to help consume Pushwoosh services in NodeJS

## Installation

  npm install pushwoosh --save

## Usage
```javascript
  var pushWoosh = require('pushwoosh');
  var pushClient= new pushWoosh("ApplicationId","APIToken");

  var config={
  "send_date":"now",
  "ignore_user_timezone": true,
  "content":"test push message",
  "data":{"custom":"this is a test"},
  "platforms":[1,2,3,4,5,6,7,8,9,10,11],
  "devices":[
    "deviceId"
  ]
};

pushClient.sendMessage(config).then(function(data){

console.log(data.status_code);
});
```
## Tests

  Coming soon

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.1 Initial release
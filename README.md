Pushwoosh
================

This is a node module I created to help consume [Pushwoosh](https://pushwoosh.com) services in NodeJS.

To read more about, see [pushWoosh documentation](https://docs.pushwoosh.com/platform-docs/).

## Installation

  npm install pushwoosh --save



## Usage of createMessage
```javascript
const pushWoosh = require('pushwoosh');
const pushClient = new pushWoosh("ApplicationId","APIToken");

const notification = {
  send_date:"now",
  ignore_user_timezone: true,
  content:"test push message",
  data:{"custom":"this is a test"},
  platforms:[1,2,3,4,5,6,7,8,9,10,11],
  devices:[
    "deviceId"
  ]
};

pushClient.createMessage(notification).then(({data})=>{
  console.log(data);
});
// same as:
// pushClient.request("/createMessage",{notifications:[notification]}).then(({data})=>{
//   console.log(data);
// });
```

## Usage of deleteMessage
```javascript
const pushWoosh = require('pushwoosh');
const pushClient = new pushWoosh("ApplicationId","APIToken");

const messageId = 'MessageId'

pushClient.deleteMessage(messageId).then(({data})=>{
  console.log(data);
});
// same as:
// pushClient.request("/deleteMessage",{message:messageId}).then(({data})=>{
//   console.log(data);
// });
```

## Tests

Coming soon

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.1 Initial release
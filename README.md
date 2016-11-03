<p align="center">
  <img src="https://www.breinify.com/img/Breinify_logo.png" alt="Breinify API JavaScript Library" width="250">
</p>

<p align="center">
Breinify's DigitalDNA API puts dynamic behavior-based, people-driven data right at your fingertips.
</p>

Installation
------------

    npm install breinify-node

Quick Start
-----------

```javascript
var Breinify = require('breinify-node');

// set configuration for Breinify
var breinify = new Breinify({
    apiKey: '23AD-F31F-F324-6666-A12D-C506-DC29-BBC2',
    secret: 'x1kobso6olasgkep9nuloq'
});
```

If you'd like to retrieve temporal data, use:

```javascript
// retrieve detailled information (current weather) about a location
breinify.temporalData(40.730610, -73.935242, function(response) {
    console.log('The weather in ' + response.location.city + 
                ' is ' + response.weather.description + 
                ' on this ' + response.time.localDayName);
});

// retrieve detailled information (location, weather) using an ip
breinify.temporalData('216.58.194.195', function(response) {
    console.log('The weather in ' + response.location.city + 
                ' is ' + response.weather.description + 
                ' on this ' + response.time.localDayName);
});
```

If you'd like to send activities, you can simple doing that by:

```javascript
var type = 'pageVisit';
var description = 'This is the home page';
breinify.activity({ 
    'email': 'diane@breinify.com',
    'sessionId': 'Rg3vHJZnehYLjVg7qi3bZjzg'
}, type, description);
```

### Documentation
Documentation is available at [API library documentation](documentation/api.md)

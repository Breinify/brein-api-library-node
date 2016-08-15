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
// grab the Breinify factory
var Breinify = require('breinify-node');

// set configuration for Breinify
Breinify.setConfig({
    apiKey: '23AD-F31F-F324-6666-A12D-C506-DC29-BBC2',
    secret: 'x1kobso6olasgkep9nuloq'
});

// start sending activities
var type = 'pageVisit';
var description = 'This is the home page';
Breinify.activity({ 
    'email': 'diane@breinify.com',
    'sessionId': 'Rg3vHJZnehYLjVg7qi3bZjzg'
}, type, description);

```


### Documentation
Documentation is available at [API library documentation](documentation/api.md)

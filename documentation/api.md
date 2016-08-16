<p align="center">
  <img src="https://www.breinify.com/img/Breinify_logo.png" alt="Breinify API JavaScript Library" width="250">
</p>

<p align="center">
Breinify's DigitalDNA API puts dynamic behavior-based, people-driven data right at your fingertips.
</p>

Breinify-node
=============

This library provides many of the features in the official JavaScript breinify library.  It is easy to use, and fully async. It is intended to be used on the server (it is not a client module). The in-browser client library is available
at [https://github.com/Breinify/brein-api-library-javascript-browser](https://github.com/Breinify/brein-api-library-javascript-browser).

Installation
------------

    npm install breinify-node

Quick Start
-----------

```javascript
// grab the Breinify factory
var Breinify = require('breinify-node');

// set configuration for Breinify
var breinify = new Breinify({
    apiKey: '23AD-F31F-F324-6666-A12D-C506-DC29-BBC2',
    secret: 'x1kobso6olasgkep9nuloq'
});


// start sending activities
var type = 'pageVisit';
var description = 'This is the home page';
breinify.activity({ 
    'email': 'diane@breinify.com',
    'sessionId': 'Rg3vHJZnehYLjVg7qi3bZjzg'
}, type, description);

```

### API Library Documentation

The library provides several attributes, methods, and objects to simplify the usage of the Breinify API. Besides methods to actually send or retrieve data, it also includes general information (e.g., about the version and used configuration), as well as utilities. Thus, the following documentation is organized in three sections: *General Attributes*, *API*, and *Utilities (UTL)*.

This documentation is organized as following:

* [General Attributes](#general-attributes)
  * Breinify.config()
  * Breinify.version()
  * Breinify.setConfig(config)
  
#### General Attributes

* {object} **Breinify.config()**:<br/>
  
  Retrieves the current configuration of the library. The following JSON is a sample object return by this function.

  ```javascript
  {
      'apiKey': null,
      'secret': null,
      'category': null,
      'debug': false,
      'verbose': false
  }
  ```
  **Configuration Properties**:
    
    {string} **apiKey**: The API-key to be used (required).
    
    {string} **secret**: The secret attached to the API-key (highly recommended when utilizing this type of library).
  
    {number} **category**: The category is needed for a fallback. 
  
    {boolean} **debug**: This will include stack traces.
    
    {boolean} **verbose**: This will console.log extra information.
    
 
* {string} **Breinify.version()**:<br/>
  
  Contains the current version of the usage library. If an error occurred while loading the library, the version is set to be *'FALLBACK'*.

  **Example Usage**:
  ```javascript
  console.log('The current version of the library is: ' + Breinify.version());
  ```
  <br/>

* **Breinify.setConfig(config)**:<br/>
  
  Updates the current configuration of the library for the properties supplied.

  **Parameters**:

  {object} **config**: A plain object specifying the configuration properties to be set. If the validation of the configuration is activated, the passed values will be validated and an *Error* will be thrown, if the specified configuration property is invalid.

  * **apiKey**: The API-key to be used (required).
  * **secret**: The secret is needed for a key that requires a verified signature.
  * **category**: The category is needed for a fallback. Take a look at [categories](#category)
    
  **Example Usage**:
  ```javascript
  Breinify.setConfig({
    apiKey: '23AD-F31F-F324-6666-A12D-C506-DC29-BBC2',
    secret: 'weoijfsoidfsdfs==',
    category: 'apparel'
  });
  ```

#### API

* **Breinify.activity(user, type, category, description, sign)**:<br/>
  Sends an activity to the engine utilizing the API. The call is done asynchronously as a POST request. It is important that a valid API-key is configured prior to using this function.

  **Parameters**:

  {object} **user**: A plain object specifying the user information the activity belongs to.
     * __email__
     * __sessionId__
     * __deviceId__
     * __md5Email__
     * __phone__
     * __additional__ {object} 
       
``` javascript
//in node, userAgent is usually request.headers['user-agent']
//in node, referrer is usually request.headers['refere‌​r']
//in node, url is usually request.url;
"additional": { 
   "userAgent": "Mozilla/5.0 (Linux; Android 4.3; C6530N Build/JLS36C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36",
   "referrer": "https://m.facebook.com/",
   "url": "https://test.com/amazingchips"
}
```

  {string | null} **type**: The type of the activity collected:
   * __pageVisit__
   * __login__
   * __search__ . 
   * __selectProduct__
   * __addToCart__
   * __removeFromCart__
   * __checkOut__
   * __logout__
   * If not specified, the default __other__ will be used.

  {string | null} **description**: A string with further information about the activity performed. Depending on the type of the activity, some typical descriptions are: 
  * __type: search__- the used search query
  * __type: selectProduct__- the name and tags of the selected product 
  * __type: addToCart || removeFromCart__- the item name, tags, or summary
  * __type: checkOut__- the amount of monetary value ($10 USD)
  * __type: pageVisit__- the page name that the user visited

  {object | null} **tags**: An object of key value pairs where the value is a number, string, boolean, or a mixed array of either number, string, or boolean. No nested objects or array of objects.
  
  ``` javascript
  "tags": {
      "flavor": "chocolate",
      "texture": ["extra chunky", "crumble"],
      "double": true
  }
  ```

  {string | null} **category**: The category of the platform/service/products:
   * __apparel__ 
   * __home__ 
   * __education__ 
   * __family__ 
   * __food__ 
   * __health__ 
   * __job__ 
   * __sports__
   * __services__ 
   * __other__ 
   * If not specified, the configured type (see *Breinify.config().category*) is used.


  {boolean|null} **sign**: A boolean value specifying if the call should have a signature generated, which is only available if the *secret* is configured. 


   **Robust Example**
   
```javascript
// grab the Breinify factory
var Breinify = require('breinify-node');

// set configuration for Breinify
Breinify.setConfig({
    apiKey: 'here-is-my-breinify-key',
    secret: 'here-is-my-breinify-secret'
});


var user = {
       "email": "diane@breinify.com",
       "sessionId": "Rg3vHJZnehYLjVg7qi3bZjzg",
       "additional": {
           "userAgent": "Mozilla/5.0 (Linux; Android 4.3; C6530N Build/JLS36C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36",
           "referrer": "https://m.facebook.com/",
           "url": "https://test.com/amazingchips"
       }
    };
    
var type = "search";
var description = 'brownies recipe';
var tags = {
          "flavor": "chocolate",
          "texture": ["extra chunky", "crumble"],
          "double": true
      }

      
Breinify.activity(user, type, description, tags, true);
    
```



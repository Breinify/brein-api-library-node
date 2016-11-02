> Install via NPM

>
```javascript--node
   npm install breinify-node
```

> Quickstart

>
```javascript--node
   // grab the Breinify factory 
   var Breinify = require('breinify-node');
   
   // set configuration for Breinify without signature
   var breinify = new Breinify({
       apiKey: 'time-is-ticking'
   });
```

> If you configured your key to require a signature, please add the following:

>
```javascript==node
    // set configuration for Breinify 
   var breinify = new Breinify({
       apiKey: 'time-is-ticking',
       secret: 'time-rift'
   });
```

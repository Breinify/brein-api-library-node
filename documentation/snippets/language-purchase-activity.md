>
```javascript--node
// the req object may be passed, e.g., using express:
//   app.post('/login', function(req, res) { ... });
var sId = Breinify.UTL.cookie.get('JSESSIONID');
var tags = {
    'productIds': [ '125689', '982361', '157029' ],
    'productPrices': [ 134.23, 15.13, 12.99 ]
};
breinify.activity({ 'sessionId': req.sessionID }, 'checkOut', tags);
```
<blockquote class="lang-specific javascript--browser">
<p>The JavaScript library offers several overloaded version
of the <code class="prettyprint">temporalData</code> method.</p>
</blockquote>

>
```javascript--node
// the req object may be passed, e.g., using express:
//   app.post('/login', function(req, res) { ... });

var sId = Breinify.UTL.cookie.get('JSESSIONID');
var tags = {
    'productIds': [ '125689', '982361', '157029' ],
    'productPrices': [ 134.23, 15.13, 12.99 ]
};
Breinify.activity({ 'sessionId': req.sessionID }, 'checkOut', tags);
```
>
```javascript--node
// the req object may be passed, e.g., using express:
//   app.post('/login', function(req, res) { ... });

breinify.activity({ 'sessionId': req.sessionID }, 'pageVisit');
```
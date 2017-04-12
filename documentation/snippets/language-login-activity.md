>
```javascript--node
// the req object may be passed, e.g., using express:
//   app.post('/login', function(req, res) { ... });

var user = {
    'sessionId': req.sessionID,
    'email': req.body.email
};

breinify.activity(user, 'login');
```
<blockquote class="lang-specific javascript--node">
<p>The Node.js library offers several overloaded versions
of the <code class="prettyprint">temporalData</code> method.</p>
</blockquote>

>
```javascript--node
var latitude = 37.7749;
var longitude = -122.4194;
Breinify.temporalData(latitude, longitude, function(data) {
	console.log(data);
});
```

>
```javascript--node
var ipAddress = '72.229.28.185';
Breinify.temporalData(ipAddress, function(data) {
	console.log(data);
});
```

>
```javascript--node
// you can also pass in a more complex location object
var loc1 = { 
    'text': 'San Diego'
};
Breinify.temporalData({ 'location': loc1 }, function(data) {
	console.log(data);
});
var loc2 = { 
    'latitude': 37.7749,
    'longitude': -122.4194
};
Breinify.temporalData({ 'location': loc2 }, function(data) {
	console.log(data);
});
```
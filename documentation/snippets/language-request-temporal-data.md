<blockquote class="lang-specific javascript--node">
<p>The Node.js library offers several overloaded versions
of the <code class="prettyprint">temporalData</code> method.</p>
</blockquote>

<blockquote class="lang-specific javascript--node">
<h3>Using Latitude/Longitude</h3>
<p>It is possible to pass in a latitude/longitude pair.</p>
</blockquote>

>
```javascript--node
var latitude = 37.7749;
var longitude = -122.4194;
breinify.temporalData(latitude, longitude, function(data) {
	console.log(data);
});
```

<blockquote class="lang-specific javascript--node">
<h3>Using IP-Address</h3>
<p>Another possibility is to just pass in an ip-address and resolve the temporal information available.</p>
</blockquote>

>
```javascript--node
var ipAddress = '72.229.28.185';
breinify.temporalData(ipAddress, function(data) {
	console.log(data);
});
```

<blockquote class="lang-specific javascript--node">
<h3>Using an Object</h3>
<p>The most general solution is to pass in an object and specify the different known values 
to determine what can be resolved (but also what should be returned), based on the provided data.
The further usage examples illustrate different possibilities.</p>
</blockquote>

>
```javascript--node
var loc1 = { 
    'text': 'San Diego'
};
breinify.temporalData({ 'location': loc1 }, function(data) {
	console.log(data);
});
var loc2 = { 
    'latitude': 37.7749,
    'longitude': -122.4194
};
breinify.temporalData({ 'location': loc2 }, function(data) {
	console.log(data);
});
```
<blockquote class="lang-specific javascript--node">
<p>To reverse geocode a location it is possible to just pass the latitute and longitude
and use the resolved information.</p>
</blockquote>

>
```javascript--node
Breinify.temporalData(37.7609295, -122.4194155, function(data) {   
	console.log(data);
});
```

<blockquote class="lang-specific javascript--node">
<p>In addition, it is possible to request 
<code class="prettyprint">GeoJson</code> instances. To do so,
a location must be specified, together with the shapes to return.</p>
</blockquote>

>
```javascript--node
var loc = {
  latitude: 40.7608, 
  longitude: -111.8910,
  shapeTypes: ['CITY']
};
Breinify.temporalData({ location: loc }, function(data) {
    console.log(data);
});
```

<blockquote class="lang-specific javascript--node">
<p>There are examples available on runkit. Have a look:
<ul>
<li><a target="_blank" href="https://runkit.com/breinify-stage/reverse-geocoding-lati-long">Coordinations Example</a></li>
<li><a target="_blank" href="https://runkit.com/breinify-stage/reverse-geocoding-geojson">GeoJson Example</a></li>
</ul>
</p>
</blockquote>

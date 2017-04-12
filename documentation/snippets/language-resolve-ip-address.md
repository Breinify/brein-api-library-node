<blockquote class="lang-specific javascript--node">
<p>In general, the ip-address can be simply passed as first parameter. If you
would like to know more about your requesting client, you can also just pass in
the requesting ip-address. There are several different ways (also depending on the 
used framework) available to determine your client's ip, for example, see 
<a target="_blank" href="https://www.npmjs.com/package/client-ip">client-ip</a>.</p>
</blockquote>

>
```javascript--node
breinify.temporalData('72.229.28.185', function(data) {
	console.log(data);
});
```

<blockquote class="lang-specific javascript--node">
<p>Check the example on runkit, to try it yourself, see 
<a target="_blank" href="https://runkit.com/breinify-stage/looking-up-ip-data">runkit (ip-address)</a>.</p>
</blockquote>
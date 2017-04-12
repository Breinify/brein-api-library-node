<blockquote class="lang-specific javascript--node">
<p>It is recommended to use the Node.js library with a signature (i.e., 
the <code class="prettyprint">Verification Signature</code> in the UI 
should be enabled and the secret is needed).</p>
<p>Whenever a <code class="prettyprint">Breinify</code> instance is created, 
the configuration has to be specified.</p>
</blockquote>

>
```javascript--node
var Breinify = require('breinify-node');
var breinify = new Breinify({ 
    'apiKey': '938D-3120-64DD-413F-BB55-6573-90CE-473A',
    'secret': 'utakxp7sm6weo5gvk7cytw==' 
});
```

<blockquote class="lang-specific javascript--node">
<p>Within this documentation the usage of the variable <code class="prettyprint">breinify</code> indicates that
a configured instance of <code class="prettyprint">Breinify</code> is used.</p>
</blockquote>
var keys = {
    'apiKeyNoSig': 'breinify-key-no-signature',
    'apiKeySig': 'breinify-key-need-signature',
    'apiKeySecret': '5e9xqoesiygkuzddxjlkaq==',
    'signature': 'rsXU0ozhfzieNLA2jQs2h2e4sz2+qHGxbgSYyfWr5EM='
};

var payload = {
    "user": {
        "email": "diane@breinify.com",
        "firstName": "Diane",
        "lastName": "Keng",
        "dateOfBirth": "01/20/1981",
        "sessionId": "Rg3vHJZnehYLjVg7qi3bZjzg",
        "deviceId": "f07a13984f6d116a",
        "imei": "990000862471854",
        "additional": {
            "userAgent": "Mozilla/5.0 (Linux; Android 4.3; C6530N Build/JLS36C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36",
            "referrer": "https://m.facebook.com/",
            "url": "https://test.com/amazingchips"
        }
    },

    "activity": {
        "type": "search",
        "description": "brownies recipe",
        "tags": {
            "flavor": "chocolate",
            "texture": ["extra chunky", "crumble"],
            "double": true
        }
    }
};

module.exports = {
    'keys': keys,
    'activityPayload': payload
};
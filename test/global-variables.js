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
        "imei": "990000862471854"
    },

    "activity": {
        "type": "login",
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
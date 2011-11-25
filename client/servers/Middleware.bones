var express = require('express');

servers.Middleware.augment({
    initialize: function(parent, app) {
        parent.call(this, app);

        this.use(express.session({ secret: 'keyboard cat' }));
        this.use(new servers['Passport'](app));
    }
});

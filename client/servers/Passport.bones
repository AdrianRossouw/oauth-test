var passport = require('passport'),
util = require('util'),
_ = require('underscore')._;

var strategies = {
    twitter: require('passport-twitter').Strategy,
    oauth: require('passport-oauth').OAuthStrategy,
    oauth2: require('passport-oauth').OAuth2Strategy
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Twitter profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

server = Bones.Server.extend({
    initialize: function(app) {
        var that = this;

        _(app.config.passport).each(function(values, key) {
            var options = {
                sessionKey : 'auth:' + key,
                callbackURL: "http://moya.local:3000/auth/" + key + "/callback"
            };
            _.extend(options, values || {});

            var strategy = new strategies[key](options, function(token, tokenSecret, profile, done) {
                profile.provider = key;
                return done(null, profile);
            });

            passport.use(strategy);
        });

        this.use(passport.initialize());
        this.use(passport.session());
        this.use(this.router);

        _(app.config.passport).each(function(values, key) {
            that.get('/auth/' + key, passport.authenticate(key), function() {});
            that.get('/auth/' + key + '/callback', passport.authenticate(key, 
                { failureRedirect: '/login' }),
                function(req, res) {
                    console.warn(req.user);
                    res.redirect('/');
                });

        });

        this.get('/logout', function(req, res){
            req.logout();
            res.redirect('/');
        });
    }
});


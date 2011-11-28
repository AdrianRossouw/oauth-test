var passport = require('passport'),
    util = require('util'),
    TwitterStrategy = require('passport-twitter').Strategy,
    OauthStrategy = require('passport-oauth');

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

        // Use the TwitterStrategy within Passport.
        //   Strategies in passport require a `verify` function, which accept
        //   credentials (in this case, a token, tokenSecret, and Twitter profile), and
        //   invoke a callback with a user object.
        passport.use(new TwitterStrategy({
                consumerKey: app.config.passport.twitter.consumer_key,
                consumerSecret: app.config.passport.twitter.consumer_secret,
                callbackURL: "http://moya.local:3000/auth/twitter/callback"
            },
            function(token, tokenSecret, profile, done) {
                return done(null, profile);
            }
        ));

        this.use(passport.initialize());
        this.use(passport.session());
        this.use(this.router);
        this.get('/auth/twitter', passport.authenticate('twitter'), function() {});
        this.get('/auth/twitter/callback', 
            passport.authenticate('twitter', { failureRedirect: '/login' }),
            function(req, res) {
                console.warn(req.user);
                res.redirect('/');
            });
        this.get('/api/user', function(req, res, next) {
            if (req.user) {
               res.send(req.user); 
            }
            else {
               res.send({ id: null });
            }
        });

    }
});


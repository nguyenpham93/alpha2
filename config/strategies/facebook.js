const FacebookStrategy  = require('passport-facebook').Strategy;
let log = require('arrowjs').logger;
let crypto = require('crypto');
let secretPass = 'Rm!t19930801';

module.exports = function (passport, config, app){
    // Use facebook strategy
    passport.use('facebook', new FacebookStrategy({
        clientID        : '1205250232917338',
        clientSecret    : 'e5a0e7a6e1fdaeb457f164b03464747e',
        callbackURL     : 'http://localhost:8000/login/facebook/callback',
        profileFields: ['id', 'emails', 'name', 'photos']
    },
    
    // facebook will send back the tokens and profile
    function (access_token, refresh_token, profile, done) {
        // asynchronous
        process.nextTick (function() {
        app.models.user.find({
                where: [
                    "lower(user_email) = ? and user_status='publish'", profile.emails[0].value.toLowerCase()
                ],
                include: [
                    {
                        model: app.models.role
                    }
                ]
            }).then ((user) => {
                if (user) {
                    if ( user['facebook_id'] && user['facebook_id'] === profile.id ) {
                        return done (null, user); // user found, return that user    
                    } else {
                        user['facebook_id'] = profile.id;
                        user['facebook_access_token'] = access_token;
                        user['user_image_facebook_url'] = profile.photos[0].value;
                        app.models.user.update({
                            facebook_id : profile.id,
                            facebook_access_token : access_token,
                            user_image_facebook_url : profile.photos[0].value
                        }, {
                            where : {
                                id : user.id
                            }
                        }).then (() => {
                            return done (null, user);    
                        });
                    }
                } else {
                    // Create new user and add to database
                    let givenName = profile.name.givenName || '';
                    let familyName = profile.name.familyName || '';
                    let displayName = '';

                    if (!givenName && !familyName) {
                        displayName = profile.emails[0].value.toLowerCase().split('@')[0]; 
                    } else {
                        displayName = givenName + familyName;
                    }

                    app.models.user.create({

                        user_pass: secretPass,
                        user_email: profile.emails[0].value.toLowerCase(),
                        user_url: 'https://facebook.com/...',
                        user_status: 'publish',
                        display_name: displayName,
                        image: '/img/admin.jpg',
                        role_id: 2,
                        role_ids: '2',  
                        facebook_id : profile.id,
                        facebook_access_token : access_token,
                        user_image_facebook_url : profile.photos[0].value
                    }).then(function (user) {
                        return done(null, user);
                    }).catch(function (err) {
                        // logger.error(err);
                        return done(err);
                    })
                }
            });
        });
    }));
};
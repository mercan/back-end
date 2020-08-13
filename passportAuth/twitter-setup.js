const TwitterStrategy = require('passport-twitter').Strategy;
const passport = require('passport');

// Models
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

passport.use(new TwitterStrategy({
		consumerKey: process.env.TWITTER_CONSUMER_KEY,
		consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
		callbackURL: 'https://soruio.herokuapp.com/auth/twitter/redirect'
	}, async (accessToken, refreshToken, profile, done) => {
		
		const currentUser = await User.findOne({ connect: 'Twitter', socialID: profile.id });
		
		if (currentUser) {
			return done(null, currentUser);
		}

		const newUser = new User({
			connect: 'Twitter',
			socialID: profile.id,
			name: profile._json.name,
			email: profile._json.email || null,
			picture: profile._json.profile_image_url_https,
			verified: profile._json.verified
		});
		
		
		if (profile._json.email) {
			const emailControl = await User.findOne({ email: profile._json.email }, '_id');

			if (emailControl) {
				return done(null, { email: newUser.email, emailError: true });
			}
		}
		
		if (profile.username) {
			const usernameControl = await User.findOne({ username: profile.username }, '_id');

			if (!usernameControl) {
				newUser.username = profile.username;
			}
		}
		
		done(null, [newUser]);
	})
);
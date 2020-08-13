const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

// Models
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: 'http://localhost:3000/auth/google/redirect'
	}, async (accessToken, refreshToken, profile, done) => {
		const currentUser = await User.findOne({ connect: 'Google', socialID: profile.id });
		
		if (currentUser) {
			return done(null, currentUser);
		}
		
		const newUser = new User({
			connect: 'Google',
			socialID: profile.id,
			name: profile._json.name,
			email: profile._json.email,
			picture: profile._json.picture
		});


		if (profile._json.email) {
			const emailControl = await User.findOne({ email: profile._json.email }, '_id');

			if (emailControl) {
				return done(null, { email: newUser.email, emailError: true });
			}
		}

		done(null, [newUser]);
	})
);
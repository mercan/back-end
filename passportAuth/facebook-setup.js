const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');

// Models
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

passport.use(new FacebookStrategy ({
		clientID: process.env.FB_CLIENT_ID,
		clientSecret: process.env.FB_CLIENT_SECRET,
		callbackURL: 'http://localhost:3000/auth/facebook/redirect',
		profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'birthday']
	}, async (accessToken, refreshToken, profile, done) => {
		const currentUser = await User.findOne({ connect: 'Facebook', socialID: profile.id });
		
		if (currentUser) {
			return done(null, currentUser);
		}
		
		const newUser = new User({
			connect: 'Facebook',
			socialID: profile.id,
			name: profile.displayName,
			email: profile._json.email,
			gender: profile.gender,
			birthday: profile._json.birthday,
			picture: profile._json.picture.data.url
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


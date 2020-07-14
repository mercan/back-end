const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const passport = require('passport');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

passport.use(new GoogleStrategy({
		clientID: '494567674994-c2pl5tujpe43g4h58u042poee83m76ot.apps.googleusercontent.com',
		clientSecret: 'mq9TjmB122cqIgxDeIcyp1ie',
		callbackURL: 'https://soruio.herokuapp.com/auth/google/redirect'
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

		done(null, [newUser, { newUser: true }]);
	})
);
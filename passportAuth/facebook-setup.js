const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const passport = require('passport');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

passport.use(new FacebookStrategy ({
		clientID: '2626956430865574',
		clientSecret: '2d078645d1aa1c866d7f41164dd5ecf5',
		callbackURL: 'https://soruio.herokuapp.com/auth/facebook/redirect',
		profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'birthday']
	}, async (accessToken, refreshToken, profile, done) => {
		const currentUser = await User.findOne({ connect: 'Facebook', socialID: profile.id });
		
		if (currentUser) {
			return done(null, { user: currentUser, currentUser: true });
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

		done(null, [newUser, { newUser: true }]);
	})
);


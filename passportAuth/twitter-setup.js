const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User');
const passport = require('passport');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

passport.use(new TwitterStrategy({
		consumerKey: 'rAFeGteqc75ijNG6LrmkeeeRF',
		consumerSecret: '4se2Inx0Gbumc9c5J5TI3TJjRUQW1GwdwV7vNK4p0DRt4Pmyck',
		callbackURL: 'https://soruio.herokuapp.com/auth/twitter/redirect'
	}, async (accessToken, refreshToken, profile, done) => {
		
		const currentUser = await User.findOne({ connect: 'Twitter', socialID: profile.id });
		
		if (currentUser) {
			return done(null, { user: currentUser, currentUser: true });
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
		
		done(null, [newUser, { newUser: true }]);
	})
);
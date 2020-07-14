const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');
const passport = require('passport');



passport.serializeUser((user, done) => done(null, user.id) );
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

passport.use(new GitHubStrategy ({
		clientID: '5b123edcdea4a8664977',
		clientSecret: 'b8b7f109d40056fb3ed9a2114d053f5e646248ca',
		callbackURL: 'https://soruio.herokuapp.com/auth/github/redirect'
	}, async (accessToken, refreshToken, profile, done) => {
		const currentUser = await User.findOne({ connect: 'Github', socialID: profile.id });
		
		if (currentUser) {
			return done(null, currentUser);
		}
		
		const newUser = new User({
			connect: 'Github',
			socialID: profile.id,
			name: profile._json.name || profile._json.login,
			email: profile._json.email || null,
			picture: profile._json.avatar_url
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
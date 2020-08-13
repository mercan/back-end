const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');

// Models
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user.id) );
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

passport.use(new GitHubStrategy ({
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: 'http://localhost:3000/auth/github/redirect'
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
		
		done(null, [newUser]);
	})
);
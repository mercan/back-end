const cors = require('cors');
const app  = require('express')();

// Database
const database = require('./helpers/db')();

// Passport 
const passport = require('passport');

require('./passportAuth/google-setup');
require('./passportAuth/github-setup');
require('./passportAuth/twitter-setup');
require('./passportAuth/facebook-setup');


// Cookie & Session
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const corsOptions = {
  origin: 'https://deneme.deneme',
}

app.use(cors(corsOptions));


// Cookie Session
app.use(cookieParser());
app.use(cookieSession({
  maxAge: 30 * 24 * 3600 * 1000,
  keys:['ekyjekljrkqklehqklejqeqwjlklte']
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Authenticate
const login  = require('./Auth/local/login');
const logout = require('./Auth/local/logout');
const signup = require('./Auth/local/signup');

app.use('/auth', require('./Auth/passport/github'));
app.use('/auth', require('./Auth/passport/google'));
app.use('/auth', require('./Auth/passport/twitter'));
app.use('/auth', require('./Auth/passport/facebook'));

app.use('/', signup);
app.use('/', login);
app.use('/', logout);


// API ROUTES GET
const eventSearch = require('./API/eventUser/eventSearch');
const getQuestion = require('./API/eventUser/getQuestion');

// API USER EVENT ROUTES POST
const joinEvent = require('./API/eventUser/joinEvent');
const createEvent = require('./API/eventUser/createEvent');
const questionLike = require('./API/eventUser/questionLike');
const createQuestion = require('./API/eventUser/createQuestion');
const userDeleteQuestion = require('./API/eventUser/userDeleteQuestion');

// API CREATOR EVENT ROUTES POST
const allBanned = require('./API/eventCreator/allBanned');
const eventBanned = require('./API/eventCreator/eventBanned');
const deleteEventBanned = require('./API/eventCreator/deleteEventBanned');
const featureUpdateQ_A = require('./API/eventCreator/featureUpdateQ-A');
const creatorDeleteQuestion = require('./API/eventCreator/creatorDeleteQuestion');


// API USER
const tokenVerifyLogin_Signup = require('./API/user/tokenVerifyLogin-Signup');
const autoCompleteUsername = require('./API/user/autoCompleteUsername');
const usernameSuggestion = require('./API/user/usernameSuggestion');
const changeUser = require('./API/user/changeUser');
const userProfile = require('./API/user/profile');
const userBlock = require('./API/user/block');
const userFollow = require('./API/user/follow');


// API NOTIFICATIONS
const notification = require('./API/eventCreator/notification');


// GET EVENT
app.use('/', eventSearch);
app.use('/', getQuestion);


// POST EVENT
app.use('/', joinEvent);
app.use('/', createEvent);
app.use('/', featureUpdateQ_A);

app.use('/', createQuestion);
app.use('/', questionLike);

app.use('/', allBanned);
app.use('/', eventBanned);
app.use('/', deleteEventBanned);

app.use('/', userDeleteQuestion);
app.use('/', creatorDeleteQuestion);

// USER
app.use('/', tokenVerifyLogin_Signup);
app.use('/', autoCompleteUsername);
app.use('/', usernameSuggestion);
app.use('/', userProfile);
app.use('/', changeUser);
app.use('/', userBlock);
app.use('/', userFollow);




// NOTIFICATIONS
app.use('/', notification);


app.listen(process.env.PORT || 3000, () => console.log('Başlatıldı'));

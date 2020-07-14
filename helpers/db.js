const mongoose = require('mongoose');

module.exports = () => {
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	mongoose.connect(process.env.DB_HOST || 'mongodb+srv://soruIo:PD5gxoy4yQ0bD3MT@soruio-79oq4.gcp.mongodb.net/test?retryWrites=true&w=majority');
	mongoose.connection.on('open',  () =>  console.log('MongoDB: Connected'));
	mongoose.connection.on('error', error => console.error('MongoDB: Error ', error));
};
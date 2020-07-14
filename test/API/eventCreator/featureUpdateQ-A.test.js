const server = require('../../../app');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/1/feature-update-q', () => {
	it('POST feature update q', done => {
		chai.request('http://localhost:3000').post('/feature-update-q')
		.set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWNkOWI0NWI4MGU1MTAwMTczMzYwODYiLCJpYXQiOjE1OTA2MjEwODcsImV4cCI6MTU5MzIxMzA4N30.k9Pc5hBsGtf6c91q-h0aVhs4gEvqcSMDIwynKpWBZ0c')
		.send({ eventcode: 'SELMANKAHYA' }).query({ 
			
			bannedUserQuestion: true, totalQuestionLimit: 99, questionLimit: 99, 
			loginQuestion: true, loginLike: true, question: false, reply: false

		}).end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})
});

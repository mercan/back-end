const server = require('../../../app');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('/1/user-delete-question', () => {
	it('POST delete question user', done => {
		chai.request('http://localhost:3000').post('/user-delete-question')
		.set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWNkOWI0NWI4MGU1MTAwMTczMzYwODYiLCJpYXQiOjE1OTA2MjEwODcsImV4cCI6MTU5MzIxMzA4N30.k9Pc5hBsGtf6c91q-h0aVhs4gEvqcSMDIwynKpWBZ0c')
		.send({ question_id: '5ed98d2dea7f20142c87f079' }).end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})

	it('POST delete question anonymous', done => {
		chai.request('http://localhost:3000').post('/anonymous-delete-question')
		.send({ question_id: '5ed98d2eea7f20142c87f07a' }).end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})
});
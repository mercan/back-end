const server = require('../../../app');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/1/create-question', () => {
	it('POST create-question user', done => {
		chai.request('http://localhost:3000').post('/create-question-user')
		.set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWNkOWI0NWI4MGU1MTAwMTczMzYwODYiLCJpYXQiOjE1OTA2MjEwODcsImV4cCI6MTU5MzIxMzA4N30.k9Pc5hBsGtf6c91q-h0aVhs4gEvqcSMDIwynKpWBZ0c')
		.send({ eventcode: 'SELMANKAHYA', question: 'Test Question' }).end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})

	it('POST create-question anonymous', done => {
		chai.request('http://localhost:3000').post('/create-question-anonymous')
		.send({ eventcode: 'SELMANKAHYA', question: 'Test Question' }).end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})
});

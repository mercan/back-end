const server = require('../../../app');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/1/event-banned-user', () => {
	it('POST eventbanned-user user ID', done => {
		chai.request('http://localhost:3000').post('/event-banned-user')
		.set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWNkOWI0NWI4MGU1MTAwMTczMzYwODYiLCJpYXQiOjE1OTA2MjEwODcsImV4cCI6MTU5MzIxMzA4N30.k9Pc5hBsGtf6c91q-h0aVhs4gEvqcSMDIwynKpWBZ0c')
		.send({ eventcode: 'SELMANKAHYA', userid: '5ed97633af7c491720409b64' }).end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})

	it('POST event-banned-user user IP', done => {
		chai.request('http://localhost:3000').post('/event-banned-user')
		.set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWNkOWI0NWI4MGU1MTAwMTczMzYwODYiLCJpYXQiOjE1OTA2MjEwODcsImV4cCI6MTU5MzIxMzA4N30.k9Pc5hBsGtf6c91q-h0aVhs4gEvqcSMDIwynKpWBZ0c')
		.send({ eventcode: 'SELMANKAHYA', question_id: '5ecd9b45b80e510017336038' }).end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})
});

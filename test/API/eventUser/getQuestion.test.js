const server = require('../../../app');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('/1/getQuestion', () => {
 
	it('GET Question token', done => {
		chai.request('http://localhost:3000').get('/getQuestion')
		.set({ 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWNkOWI0NWI4MGU1MTAwMTczMzYwODYiLCJpYXQiOjE1OTA2MjEwODcsImV4cCI6MTU5MzIxMzA4N30.k9Pc5hBsGtf6c91q-h0aVhs4gEvqcSMDIwynKpWBZ0c' })
		.query({ eventcode: "SELMANKAHYA", skip: 0, limit: 999})
		.end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})

	it('GET Question IP', done => {
		chai.request('http://localhost:3000').get('getQuestion')
		.query({ eventcode: "SELMANKAHYA", skip: 0, limit: 999})
		.end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})

});
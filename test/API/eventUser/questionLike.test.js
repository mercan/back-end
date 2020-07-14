const server = require('../../../app');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('/1/like-question-user', () => {
	it('POST like-question-user', done => {
		chai.request('http://localhost:3000').post('/like-question-user')
		.set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWNkOWI0NWI4MGU1MTAwMTczMzYwODYiLCJpYXQiOjE1OTA2MjEwODcsImV4cCI6MTU5MzIxMzA4N30.k9Pc5hBsGtf6c91q-h0aVhs4gEvqcSMDIwynKpWBZ0c')
		.send({ question_id: "5ed15943a7074d00178567d5" }).end((err, res) => {
			res.should.have.status(200);
			done();
		});
	})
	

	it('POST like-question-anonymous', done => {
		chai.request('http://localhost:3000').post('/like-question-anonymous')
		.send({ question_id: "5ed15943a7074d00178567d5" }).end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})
});

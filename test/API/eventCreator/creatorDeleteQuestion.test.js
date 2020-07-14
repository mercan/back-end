const server = require('../../../app');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/1/creator-delete-question', () => {
	it('POST creator delete question', done => {
		chai.request('http://localhost:3000').post('/creator-delete-question').set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWNkOWI0NWI4MGU1MTAwMTczMzYwODYiLCJpYXQiOjE1OTA2MjEwODcsImV4cCI6MTU5MzIxMzA4N30.k9Pc5hBsGtf6c91q-h0aVhs4gEvqcSMDIwynKpWBZ0c')
		.send({ question_id: '5ed05a509d44ff0ae00b9114' }).end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})
});
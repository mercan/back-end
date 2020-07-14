const server = require('../../../app');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/1/event', () => {
	it('GET event', done => {
		chai.request('http://localhost:3000').get('/event').query({ code: 'SELMANKAHYA' }).end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})
});

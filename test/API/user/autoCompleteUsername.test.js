const server = require('../../../app');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('/username-search', () => {

	it('Username Search', done => {
		chai.request('http://localhost:3000').get('/username-search')
		.query({ username: "C" })
		.end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})

});
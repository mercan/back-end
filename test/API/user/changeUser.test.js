const server = require('../../../app');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('/change', () => {
	it('POST email', done => {
		chai.request('http://localhost:3000').post('/change_email')
		.set({ 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWNkOWI0NWI4MGU1MTAwMTczMzYwODYiLCJpYXQiOjE1OTA2MjEwODcsImV4cCI6MTU5MzIxMzA4N30.k9Pc5hBsGtf6c91q-h0aVhs4gEvqcSMDIwynKpWBZ0c' })
		.send({ email: "mrcnn@gmail.com" })
		.end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})

	it('POST password', done => {
		chai.request('http://localhost:3000').post('/change_password')
		.set({ 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWNkOWI0NWI4MGU1MTAwMTczMzYwODYiLCJpYXQiOjE1OTA2MjEwODcsImV4cCI6MTU5MzIxMzA4N30.k9Pc5hBsGtf6c91q-h0aVhs4gEvqcSMDIwynKpWBZ0c' })
		.send({ newPassword: "newPassword", password: "Kullanılan Password" })
		.end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})

	it('POST name', done => {
		chai.request('http://localhost:3000').post('/change_name')
		.set({ 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWNkOWI0NWI4MGU1MTAwMTczMzYwODYiLCJpYXQiOjE1OTA2MjEwODcsImV4cCI6MTU5MzIxMzA4N30.k9Pc5hBsGtf6c91q-h0aVhs4gEvqcSMDIwynKpWBZ0c' })
		.send({ name: "İbrahim Can" })
		.end((err, res) => {
			res.should.have.status(200);
			done();
		})
	})
});
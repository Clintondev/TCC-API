//tests/server.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

const app = require('../src/server'); 

describe('API Tests', () => {
    it('should return an empty list initially', (done) => {
        chai.request(app)
            .get('/items')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').that.is.empty;
                done();
            });
    });

    it('should add a new item', (done) => {
        chai.request(app)
            .post('/items')
            .send({ name: 'Test Item' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.include({ name: 'Test Item' });
                done();
            });
    });

    it('should fetch an item by ID', (done) => {
        chai.request(app)
            .get('/items/1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.include({ name: 'Test Item' });
                done();
            });
    });
});

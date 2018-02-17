let chai = require('chai');
let chaiHttp = require('chai-http');
let httpStatus = require('http-status');

let server = require('../dist/index');
let should = chai.should();

chai.use(chaiHttp);


describe('/POST any', () => {
    it('it should fail on not found routes  because of not found route', (done) => {
        chai.request(server)
            .post('/xxxx')
            .send({
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('status').eql(404);
                res.body.should.have.property('statusText').eql("Internal Error");
                res.body.should.have.property('message').eql("Not Found");
                done();
            });
    });
});


describe('/POST generate plan', () => {
    it('it should successfully generate plan', (done) => {
        chai.request(server)
            .post('/generate-plan')
            .send({
                loanAmount: "5000",
                nominalRate: "5.0",
                duration: 24,
                startDate: "2018-01-01T00:00:01Z"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql(200);
                res.body.should.have.property('statusText').eql("OK");
                res.body.should.have.property('message').should.be.a('object');;
                done();
            });
    });
});



describe('/POST generate plan', () => {
    it('it should fail on generating plan because of validation error', (done) => {
        chai.request(server)
            .post('/generate-plan')
            .send({
                loanAmount: "fivethousand",
                nominalRate: "5.0",
                duration: 24,
                startDate: "2018-01-01T00:00:01Z"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('status').eql(400);
                res.body.should.have.property('statusText').eql("Bad Request");
                res.body.should.have.property('message').eql("validation error . \"loanAmount\" with value \"fivethousand\" fails to match the required pattern: /^[0-9]+$/");
                done();
            });
    });
});




describe('/POST generate plan', () => {
    it('it should fail on generating plan because of validation error', (done) => {
        chai.request(server)
            .post('/generate-plan')
            .send({
                loanAmount: "5000",
                nominalRate: "5.0",
                duration: "four",
                startDate: "2018-01-01T00:00:01Z"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('status').eql(400);
                res.body.should.have.property('statusText').eql("Bad Request");
                res.body.should.have.property('message').eql("validation error . \"duration\" must be a number");
                done();
            });
    });
});



describe('/POST generate plan', () => {
    it('it should fail on generating plan because of validation error', (done) => {
        chai.request(server)
            .post('/generate-plan')
            .send({
                loanAmount: "5000",
                duration: 24,
                startDate: "2018-01-01T00:00:01Z"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('status').eql(400);
                res.body.should.have.property('statusText').eql("Bad Request");
                res.body.should.have.property('message').eql("validation error . \"nominalRate\" is required");
                done();
            });
    });
});



describe('/POST generate plan', () => {
    it('it should fail on generating plan because of validation error', (done) => {
        chai.request(server)
            .post('/generate-plan')
            .send({
                loanAmount: "5000",
                nominalRate: "5.0",
                duration: 24,
                startDate: "2018-13-01T00:00:01Z"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('status').eql(400);
                res.body.should.have.property('statusText').eql("Bad Request");
                res.body.should.have.property('message').eql("validation error . \"startDate\" must be a valid ISO 8601 date");
                done();
            });
    });
});




describe('/POST generate plan', () => {
    it('it should fail on generating plan wrong value', (done) => {
        chai.request(server)
            .post('/generate-plan')
            .send({
                loanAmount: "1",
                nominalRate: "0",
                duration: 10,
                startDate: "2018-01-01T00:00:01Z"
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('status').eql(404);
                res.body.should.have.property('statusText').eql("Internal Error");
                res.body.should.have.property('message').eql("Nominal Rate must be greater than zero");
                done();
            });
    });
});

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

var User = require('../models/user');

var agent = chai.request.agent(server);

describe('User', function() {

  // SIGNUP
  it('should be able to signup', function (done) {
    User.findOneAndRemove({ email: "test@11.com" }, function() {
      agent
        .post('/sign-up')
        .send({ email: 'test@11.com', password: 'password' })
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('token');
          done(); //time out error if that is not there
        })
    });
});

  // LOGIN
  it('should be able to login', function (done) {
    agent
      .post('/login')
      .send({ email: "test@11.com", password: "password" })
      .end(function (err, res){
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('token');
        done();
      });
  });

});

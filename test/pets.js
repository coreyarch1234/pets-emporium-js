var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

var Pet = require('../models/pet');

var agent = chai.request.agent(server);

describe("Pet", function() {

  var token;

  before(function(){
    agent
      .post('/login')
      .send({ email: "test@11.com", password: "password" })
      .end(function (err, res){
          token = res.body.token
      });
  });


  // INDEX
  it('should list ALL pets on / GET', function (done) {
      agent
        .get('/')
        .end(function(err,res){
            res.should.have.status(200);

            done();
        });

  });

  // SHOW
  // it('should list ALL pets on /pets/:id GET', function (done) {
  //
  // });


  // CREATE
  it('should post a pet pets on /pets POST', function (done) {
      Pet.findOneAndRemove({name: "Spotter"}, function(){
         agent
            .post('/pets')
            .set('Cookie', 'token =' + token)
            .send({name: "Spotter", description: "He is spotted"})
            .end(function(err, res){
                res.body.should.be.an('object');

                res.should.have.status(200);
                done();
            });
      });
  });

});

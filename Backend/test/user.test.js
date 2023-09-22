const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();

chai.use(chaiHttp);

describe("User Routes", () => {
  let userId;

  // Test GET route
  describe("GET /users/:id", () => {
    it("it should GET a user by id", (done) => {
      const userId = "your-test-user-id";

      chai
        .request(server)
        .get(`/users/${userId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("username");
          done();
        });
    });
  });

  // Test PUT route
  describe("PUT /users/:id", () => {
    it("it should UPDATE a user by id", (done) => {
      const updatedUserData = {
        username: "updated-username",
      };

      chai
        .request(server)
        .put(`/users/${userId}`)
        .send(updatedUserData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("username").eql("updated-username");

          done();
        });
    });
  });

  // Test DELETE route
  describe("DELETE /users/:id", () => {
    it("it should DELETE a user by id", (done) => {
      chai
        .request(server)
        .delete(`/users/${userId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("string").eql("User has been deleted");

          done();
        });
    });
  });
});

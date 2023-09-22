const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Event Post Routes", () => {
  // Define a test event post object
  const testEventPost = {
    title: "Test Post",
    desc: "This is a test post.",
    username: "testuser",
    edate: "2023-09-22",
    etime: "12:00 PM",
  };

  let postId;

  before((done) => {
    // Start the Express app
    const server = app.listen(5000, () => {
      console.log("Express server started on port 5000");
      done();
    });
  });

  after((done) => {
    server.close(() => {
      console.log("Express app closed");
      done();
    });
  });

  // Create a new event post
  describe("POST /api/post", () => {
    it("should create a new event post", (done) => {
      chai
        .request(app)
        .post("/api/post")
        .send(testEventPost)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          done();
        });
    });
  });

  // Get a specific event post by ID
  describe("GET /api/post/:id", () => {
    it("should get a specific event post by ID", (done) => {
      chai
        .request(app)
        .get(`/api/post/${postId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.title).to.equal(testEventPost.title);
          done();
        });
    });
  });

  // Update an event post by ID
  describe("PUT /api/post/:id", () => {
    it("should update an event post by ID", (done) => {
      const updatedEventPost = {
        title: "Updated Post Title",
      };

      chai
        .request(app)
        .put(`/api/post/${postId}`)
        .send(updatedEventPost)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.title).to.equal(updatedEventPost.title);
          done();
        });
    });
  });

  // Delete an event post by ID
  describe("DELETE /api/post/:id", () => {
    it("should delete an event post by ID", (done) => {
      chai
        .request(app)
        .delete(`/api/post/${postId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body)
            .to.be.a("string")
            .that.includes("Post has been deleted");
          done();
        });
    });
  });

  after((done) => {
    done();
  });
});

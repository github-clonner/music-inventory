// npm test will run the tests

const chai = require('chai');
const request = require('request');

describe('Server Tests', () => {
  it('responds to GET on /', (done) => {
    request('http://localhost:8000', (error, response, body) => {
      chai.expect(body).to.equal('hi there');
      done();
    });
  });
  it('responds to GET on /playlists', (done) => {
    request('http://localhost:8000/playlists', (error, response, body) => {
      chai.expect(JSON.parse(body)).to.be.a('array');
      chai.expect(JSON.parse(body)).to.have.lengthOf(20);
      done();
    });
  });
});


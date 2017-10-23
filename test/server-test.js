// npm test will run the tests

const chai = require('chai');
const request = require('request');

console.log('in here');
it('responds to GET on /', (done) => {
  request('http://localhost:8000', (error, response, body) => {
    chai.expect(body).to.equal('Server works\n');
    done();
  });
});

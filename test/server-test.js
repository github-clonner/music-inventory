var expect = require('chai').expect;
var request = require('request');

console.log('in here');
it('responds to GET on /', function(done) {
  request('http://localhost:8000', function(error, response, body) {
    expect(body).to.equal('Server works\n');
    done();
  });
});

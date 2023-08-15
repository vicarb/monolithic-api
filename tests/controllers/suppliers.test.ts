import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/index';

describe('GET /api/suppliers', function() { // Using a regular function here, not an arrow function
    this.timeout(5000); // Setting the timeout to 5 seconds
  
    it('should fetch all suppliers', (done) => {
      request(app)
        .get('/api/suppliers')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          // Additional checks based on your logic
          done();
        });
    });
  });
  
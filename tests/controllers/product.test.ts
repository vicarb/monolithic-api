import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/index';

describe('Product Routes', function() {
  this.timeout(5000); // Setting the timeout to 5 seconds for all tests in this describe block

  it('should fetch all products', (done) => {
    request(app)
      .get('/api/products')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should fetch a specific product by ID', (done) => {
    const productId = 'some-product-id'; // Replace with a valid ID
    request(app)
      .get(`/api/products/${productId}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body._id).to.equal(productId);
        done();
      });
  });
});

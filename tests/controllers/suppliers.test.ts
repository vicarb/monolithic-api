import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/index';

describe('Supplier Routes', function() {
    this.timeout(5000); // Setting the timeout to 5 seconds for all tests in this describe block
  
    it('should fetch all suppliers', (done) => {
      request(app)
        .get('/api/suppliers')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  
    it('should fetch a specific supplier by ID', (done) => {
      const supplierId = '64db1745e7348e2ad479fbde'; // Replace with a valid ID
      request(app)
        .get(`/api/suppliers/${supplierId}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body._id).to.equal(supplierId); // Updated to _id
          done();
        });
    });
  
    it('should create a new supplier', (done) => {
      const newSupplier = { name: 'Test Supplier', contact: 'test@test.com' };
      request(app)
        .post('/api/suppliers')
        .send(newSupplier)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.include(newSupplier);
          done();
        });
    });
  
    it('should update an existing supplier', (done) => {
      const supplierId = '64db1745e7348e2ad479fbde'; // Replace with a valid ID
      const updatedInfo = { name: 'Updated Name' };
      request(app)
        .put(`/api/suppliers/${supplierId}`)
        .send(updatedInfo)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.name).to.equal('Updated Name');
          done();
        });
    });
  
    it('should delete a supplier', (done) => {
      const supplierId = '64db1745e7348e2ad479fbde'; // Replace with a valid ID
      request(app)
        .delete(`/api/suppliers/${supplierId}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(204);
          done();
        });
    });
  
});

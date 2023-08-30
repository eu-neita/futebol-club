import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

describe('GET /login/role', () => {
  it('should respond with an error when the token is missing', (done) => {
    chai.request(app)
      .get('/login/role')
      .end((err, res) => {
        chai.expect(res).to.have.status(401);
        chai.expect(res.body).to.deep.equal({ message: 'Token not found' });
      });
      done();
  });

  it('should respond with an error when the token is invalid', (done) => {
    chai.request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer invalid_token')
      .end((err, res) => {
        chai.expect(res).to.have.status(401);
        chai.expect(res.body).to.deep.equal({ message: 'Token must be a valid token' });
      });
      done();
  });

  it('should respond with the user role when given a valid token', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      })
      .end((err, res) => {
        const token = res.body.token;
  
        chai.request(app)
          .get('/login/role')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.have.property('role');
            done();
          });
      });
  });
});
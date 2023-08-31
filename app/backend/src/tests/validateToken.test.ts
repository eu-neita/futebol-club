import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../models/UserModel';

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

  it('should respond with an error when the token is invalid', () => {
    chai.request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer invalid_token')
      .end((err, res) => {
        chai.expect(res).to.have.status(401);
        chai.expect(res.body).to.deep.equal({ message: 'Token must be a valid token' });
      });
  });

  it('should respond with the user role when given a valid token', (done) => {
    sinon.stub(UserModel.prototype, 'getRole').resolves({role: 'admin'});
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

          });
      });
      sinon.restore();
      done();
  });

});
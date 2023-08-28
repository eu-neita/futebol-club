import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  it('should respond with a token when given valid credentials', () => {
    chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
      });
  });

  it('should respond with an error when the email is missing', () => {
    chai.request(app)
      .post('/login')
      .send({
        password: 'secret_admin',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.deep.equal({ message: 'All fields must be filled' });
      });
  });

  it('should respond with an error when invalid email or pass', () => {
    chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admidasd',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.deep.equal({ message: 'Invalid email or password' });
      });
    });

  it('should respond with an error when the password is missing', () => {
    chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.deep.equal({ message: 'All fields must be filled' });
      });
  });

});
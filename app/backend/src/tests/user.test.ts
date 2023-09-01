import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');
import UserModel from '../models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('User Authentication API', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return a token with valid credentials', async () => {
    const user = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
    }
    sinon.stub(UserModel.prototype, 'login').resolves(user as any);

    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });
    expect(response.status).to.be.equal(200);
  });

  it('should return status code 401 for non-existent user', async () => {
    sinon.stub(UserModel.prototype, 'login').resolves({message: 'Invalid email or password'} as any);

    const response = await chai.request(app).post('/login').send({
      email: 'admin@adminfake.com',
      password: 'secret_admin',
    });

    expect(response.body.message).to.be.equal('Invalid email or password');
  });

  it('should return status code 401 for an invalid email', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin',
      password: 'secret_admin',
    });

    expect(response.body.message).to.be.equal('Invalid email or password');
    expect(response.status).to.be.equal(401);
  });

  it('should return status code 401 for an invalid password', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret',
    });

    expect(response.body.message).to.be.equal('Invalid email or password');
    expect(response.status).to.be.equal(401);
  });

  it('should return status code 400 when email is missing', async () => {
    const response = await chai.request(app).post('/login').send({
      password: 'secret_admin',
    });

    expect(response.body.message).to.be.equal('All fields must be filled');
    expect(response.status).to.be.equal(400);
  });

  it('should return status code 400 when password is missing', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
    });

    expect(response.body.message).to.be.equal('All fields must be filled');
    expect(response.status).to.be.equal(400);
  });

  it('should return status code 400 for an empty email field', async () => {
    const response = await chai.request(app).post('/login').send({
      email: '',
      password: 'secret_admin',
    });

    expect(response.body.message).to.be.equal('All fields must be filled');
    expect(response.status).to.be.equal(400);
  });

  it('should return status code 400 for an empty password field', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: '',
    });

    expect(response.body.message).to.be.equal('All fields must be filled');
    expect(response.status).to.be.equal(400);
  });
});
import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');
import UserModel from '../models/UserModel';

chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2OTM1NDAxNTYsImV4cCI6MTY5Mzc5OTM1Nn0.pq5-mxpIGnL2iwCYph42DGYurUtaQW8QTOeLM8421NQ';


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

  it('admin role test', async () => {
    const response = await chai.request(app).get('/login/role').set('authorization', `Baerer ${token}`)
    expect(response.body.role).to.be.equal("admin");
    expect(response.status).to.be.equal(200);
  });

  it('admin role test invalid token', async () => {
    const response = await chai.request(app).get('/login/role').set('authorization', `invalid`)
    expect(response.body.message).to.be.equal("Token must be a valid token");
    expect(response.status).to.be.equal(401);
  });
    
  it('admin role test no token', async () => {
    const response = await chai.request(app).get('/login/role')
    expect(response.body.message).to.be.equal("Token not found");
    expect(response.status).to.be.equal(401);
  });
});
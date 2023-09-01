import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');

import MatchModel from '../models/MatcheModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Route Tests', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should list all matches', async () => {
    sinon.stub(MatchModel.prototype, 'findAll').resolves([]);
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
  });

  it('should list in-progress matches', async () => {
    sinon.stub(MatchModel.prototype, 'findAll').resolves([]);
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.equal(200);
  });

  it('should list finished matches', async () => {
    sinon.stub(MatchModel.prototype, 'findAll').resolves([]);
    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.be.equal(200);
  });

  it('should create a match', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
    sinon.stub(MatchModel.prototype, 'createMatchesBy').resolves({} as any);

    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2OTM1NDAxNTYsImV4cCI6MTY5Mzc5OTM1Nn0.pq5-mxpIGnL2iwCYph42DGYurUtaQW8QTOeLM8421NQ')
      .send({
        homeTeamId: 1,
        awayTeamId: 3,
        homeTeamGoals: 0,
        awayTeamGoals: 0,
        inProgress: true,
      });

    expect(response.status).to.be.equal(201);
  });

  it('should update a match', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
    sinon.stub(MatchModel.prototype, 'updateMatchesById').resolves({} as any);

    const response = await chai.request(app)
      .patch('/matches/1')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2OTM1NDAxNTYsImV4cCI6MTY5Mzc5OTM1Nn0.pq5-mxpIGnL2iwCYph42DGYurUtaQW8QTOeLM8421NQ')
      .send({
        homeTeamId: 1,
        awayTeamId: 3,
        homeTeamGoals: 0,
        awayTeamGoals: 0,
        inProgress: true,
      });

    expect(response.status).to.be.equal(200);
  });

  it('no token return 401', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'd'} as any);
    sinon.stub(MatchModel.prototype, 'updateMatchesById').resolves({} as any);

    const response = await chai.request(app)
      .patch('/matches/1')
      .set('authorization', 'Bearer invalid')
      .send({
        homeTeamId: 1,
        awayTeamId: 3,
        homeTeamGoals: 0,
        awayTeamGoals: 0,
        inProgress: true,
      });

    expect(response.status).to.be.equal(401);
  });
});

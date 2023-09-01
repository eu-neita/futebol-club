import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');

import MatchModel from '../models/MatcheModel';

chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2OTM1NDAxNTYsImV4cCI6MTY5Mzc5OTM1Nn0.pq5-mxpIGnL2iwCYph42DGYurUtaQW8QTOeLM8421NQ';
const { expect } = chai;

describe('Matches Route Tests', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should list all matches', async () => {
    // sinon.stub(MatchModel.prototype, 'findAll').resolves([]);
    const response = await chai.request(app).get('/matches');
    expect(response.body[0]).to.be.deep.equal(  {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: "São Paulo"
      },
      awayTeam: {
        teamName: "Grêmio"
      }
    });
    expect(response.status).to.be.equal(200);
  });

  it('should list in-progress matches', async () => {
    const {body}= await chai.request(app).get('/matches');
    const all = body.filter((par: any) => par.inProgress === true);
    // sinon.stub(MatchModel.prototype, 'findAll').resolves([]);
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.body.length).to.be.deep.equal(8);
    expect(response.body).to.be.deep.equal(all);
    expect(response.status).to.be.equal(200);
  });

  it('should list finished matches', async () => {
    const {body}= await chai.request(app).get('/matches');
    const all = body.filter((par: any) => par.inProgress === false);
    // sinon.stub(MatchModel.prototype, 'findAll').resolves([]);
    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.body.length).to.be.deep.equal(40);
    expect(response.body).to.be.deep.equal(all);
    expect(response.status).to.be.equal(200);
  });

  it('should create a match', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
    sinon.stub(MatchModel.prototype, 'createMatchesBy').resolves({} as any);

    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', `Baerer ${token}`)
      .send({
        homeTeamId: 1,
        awayTeamId: 3,
        homeTeamGoals: 0,
        awayTeamGoals: 0,
      });

    expect(response.status).to.be.equal(201);
  });

  it('should no create a match equal team', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
    sinon.stub(MatchModel.prototype, 'createMatchesBy').resolves({} as any);

    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', `Baerer ${token}`)
      .send({
        homeTeamId: 3,
        awayTeamId: 3,
        homeTeamGoals: 0,
        awayTeamGoals: 0,
      });

    expect(response.status).to.be.equal(422);
  });

  it('should no create a match team not exist', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
    sinon.stub(MatchModel.prototype, 'createMatchesBy').resolves({} as any);

    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', `Baerer ${token}`)
      .send({
        homeTeamId: 66,
        awayTeamId: 3,
        homeTeamGoals: 0,
        awayTeamGoals: 0,
      });

    expect(response.status).to.be.equal(404);
  });

  it('should no create a match team not valid email', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'd'} as any);
    sinon.stub(MatchModel.prototype, 'createMatchesBy').resolves({} as any);

    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', ``)
      .send({
        homeTeamId: 5,
        awayTeamId: 3,
        homeTeamGoals: 0,
        awayTeamGoals: 0,
      });

    expect(response.status).to.be.equal(401);
  });

  it('should update a match', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
    sinon.stub(MatchModel.prototype, 'updateMatchesById').resolves({} as any);

    const response = await chai.request(app)
      .patch('/matches/1')
      .set('authorization', `Baerer ${token}`)
      .send({
        homeTeamId: 1,
        awayTeamId: 3,
        homeTeamGoals: 0,
        awayTeamGoals: 0,
        inProgress: true,
      });

    expect(response.status).to.be.equal(200);
  });


  it('should finish a match', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
    sinon.stub(MatchModel.prototype, 'updateById').resolves({} as any);

    const response = await chai.request(app)
      .patch('/matches/40/finish')
      .set('authorization', `Baerer ${token}`)
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 1,
      });


    expect(response.status).to.be.equal(200);
  });


  // it('should finish a match id not found', async () => {
  //   sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
  //   sinon.stub(MatchModel.prototype, 'updateById').resolves({} as any);

  //   const response = await chai.request(app)
  //     .patch('/matches/999/finish')
  //     .set('authorization', `Baerer ${token}`)
  //     .send({
  //       homeTeamGoals: 3,
  //       awayTeamGoals: 1,
  //     });


  //   expect(response.status).to.be.equal(400);
  // });

  it('should finish a match whorng email', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'd'} as any);
    sinon.stub(MatchModel.prototype, 'updateById').resolves({} as any);

    const response = await chai.request(app)
      .patch('/matches/40/finish')
      .set('authorization', `Baerer invalid`)
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 1,
      });


      expect(response.status).to.be.equal(401);
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

  it('should return 404 error when one of the teams does not exist in the database', async function () {
    const { status, body } = await chai.request(app).post('/matches')
      .set('authorization', `Baerer ${token}`)
      .send({ homeTeamId: 16,
              homeTeamGoals: 2,
              awayTeamGoals: 2,
              awayTeamId: 66
            });
    
    expect(status).to.be.eq(404);
    expect(body).to.be.deep.equal({ message: 'There is no team with such id!' });
  });
});

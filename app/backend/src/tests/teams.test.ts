import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
import teamMock from './mocks/teamsMock'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves(teamMock as Team);
  });


  it('should create a team table', async () => {
    const team = await Team.create({
      teamName: 'Test Team',
    });
    expect(team).to.have.property('id');
    expect(team).to.have.property('teamName', 'Test Team');
  });

  it('should return all teams with status 200', async () => {
    const res = await chai.request(app).get('/teams');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length.greaterThan(0);
    expect(res.body[0]).to.have.property('id');
    expect(res.body[0]).to.have.property('teamName');
  });

  after(()=>{
    (Team.findOne as sinon.SinonStub).restore();
  })

});

describe('/teams:id', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves(teamMock as Team);
  });

  it('should return all teams with status 200', async () => {
    const res = await chai.request(app).get('/teams/5');
    expect(res).to.have.status(200);
    // expect(res.body).to.be.an('array');
    expect(res.body).to.have.length.greaterThan(0);
    expect(res.body).to.have.property('id');
    expect(res.body.message.id).to.been.deep.equal('5');
    expect(res.body).to.have.property('teamName');
    expect(res.body.message.teamName).to.been.deep.equal('Cruzeiro');
  });

  after(()=>{
    (Team.findOne as sinon.SinonStub).restore();
  })

});

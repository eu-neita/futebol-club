import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
import teamMock from './teamsMock'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves(teamMock as Team);
  });


  it('should create a team', async () => {
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

  it('model test', async () => {
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});

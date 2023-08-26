import * as sinon from 'sinon';
import * as chai from 'chai';
import teamMock from './teamsMock'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';
import { after, before } from 'node:test';

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

  after(()=>{
    (Team.findOne as sinon.SinonStub).restore();
  })

  describe('/teams endpoint', () => {
    it('should return all teams with status 200', async () => {
      const res = await chai.request(app).get('/teams');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.length.greaterThan(0);
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0]).to.have.property('teamName');
    });
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});

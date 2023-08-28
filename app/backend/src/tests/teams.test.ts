import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
import teamMock from './mocks/teamsMock'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {
  let chaiHttpResponse: Response;

  it('should return all teams with status 200', async () => {
    const res = await chai.request(app).get('/teams');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length.greaterThan(0);
    expect(res.body[0]).to.have.property('id');
    expect(res.body[0]).to.have.property('teamName');
  });

});

describe('/teams:id', () => {
  let chaiHttpResponse: Response;

  it('should return all teams with status 200', async () => {
    const res = await chai.request(app).get('/teams/1');
    expect(res).to.have.status(200);
    // expect(res.body).to.be.an('array');
    expect(res.body).to.have.property('id');
    expect(res.body.id).to.been.deep.equal(1);
    expect(res.body).to.have.property('teamName');
    expect(res.body.teamName).to.been.deep.equal('Avaí/Kindermann');
  });

  it('should return team by id if not exist return null', async () => {
    const res = await chai.request(app).get('/teams/666');
    expect(res).to.have.status(200);
    expect(res.body).to.be.equal(null);
    console.log(res);
  });

});

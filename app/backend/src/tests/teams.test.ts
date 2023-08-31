import * as chai from 'chai';
import 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as sinon from 'sinon';
import TeamModel from '../models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {

  it('should return all teams with status 200', async () => {
    sinon.stub(TeamModel.prototype, 'findAll').resolves([
      {
        id: 1,
        teamName: 'Avaí/Kindermann',
      },
      {
        id: 2,
        teamName: 'Avaí/Kindermannada',
      },
    ]);
    const res = await chai.request(app).get('/teams');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length.greaterThan(0);
    expect(res.body[0]).to.have.property('id');
    expect(res.body[0]).to.have.property('teamName');
    sinon.restore();
  });

});
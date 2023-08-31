import * as chai from 'chai';
import 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as sinon from 'sinon';
import TeamModel from '../models/TeamModel';
import Team from '../database/models/TeamModel';
import { ITeamModel } from '../Interfaces/teams/ITeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {
  it('should return all teams with status 200', (done) => {
    chai.request(app)
      .get('/teams')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length.greaterThan(0);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('teamName');
      });
      done();
    });
});

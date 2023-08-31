import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../models/MatcheModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('/matches/:id', () => {

  it('should update a match in progress', async () => {
    sinon.stub(MatchModel.prototype, 'updateById').resolves('updated');
    chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      })
      .end((err, res) => {
        const token = res.body.token;
        chai.request(app)
          .patch('/matches/40')
          .set('Authorization', `Bearer ${token}`)
          .send({
            homeTeamGoals: 3,
            awayTeamGoals: 1,
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.be.equal('updated');
          });
      });
      sinon.restore();
  });

});
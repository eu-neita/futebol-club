import * as chai from 'chai';
import 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('/matches', () => {
  // before(async () => {
  //   await sequelize.sync({ force: true });
  // });

  it('should return a list of matches without any filter', async () => {
    chai.request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    })
    .end( (err, res) => {
      const token = res.body.token;
      chai.request(app)
      .get('/matches')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(48);
        expect(res.body[0]).to.deep.equal({
          id: 1,
          homeTeamId: 16,
          homeTeamGoals: 3,
          awayTeamGoals: 1,
          awayTeamId: 8,
          inProgress: false,
          homeTeam: {
            teamName: 'São Paulo'
          },
          awayTeam: {
            teamName: 'Grêmio'
          }
        });
      });
    });
  });

  it('should return a list of matches with progress filter true', async () => {
    chai.request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    })
    .end( (err, res) => {
      const token = res.body.token;
      chai.request(app)
      .get('/matches?inProgress=true')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(8);
      });
    });
  });

  it('should return a list of matches with progress filter false', async () => {
    chai.request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    })
    .end( (err, res) => {
      const token = res.body.token;
      chai.request(app)
      .get('/matches?inProgress=false')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(40);
      });
    });
  });

  it('if token undefined return error Token not found', async () => {
      chai.request(app)
      .get('/matches?inProgress=false')
      .set('Authorization', `Bearer `)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('array');
        expect(res.body.message).to.be.equal('Token not found');
    });
  });
});

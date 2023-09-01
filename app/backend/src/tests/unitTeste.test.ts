import { expect } from 'chai';
import * as sinon from 'sinon';
import TeamModel from '../models/TeamModel';
// @ts-ignore
import Team from '../database/models/TeamModel';

describe('TeamModel', () => {
  describe('findAll', () => {
    it('should return all teams', async () => {
      const teams = [{ id: 1, teamName: 'Team 1' }, { id: 2, teamName: 'Team 2' }];
      const teamModel = new TeamModel();
      const findAllStub = sinon.stub(Team, 'findAll').resolves(teams as any);

      const result = await teamModel.findAll();

      expect(findAllStub.calledOnce).to.be.true;
      expect(result).to.deep.equal(teams);

      findAllStub.restore();
    });
  });
});

// describe('TeamModel', () => {
//   describe('findById', () => {
//     it('should return a team when the id exists', async () => {
//       const team = { id: 1, teamName: 'Team 1' };
//       const teamModel = new TeamModel();
//       const findByPkStub = sinon.stub(Team, 'findByPk').resolves(team as any);

//       const result = await teamModel.findById(1);

//       expect(findByPkStub.calledOnceWith(1)).to.be.true;
//       expect(result).to.deep.equal(team);

//       findByPkStub.restore();
//     });

//     it('should return null when the id does not exist', async () => {
//       const teamModel = new TeamModel();
//       const findByPkStub = sinon.stub(Team, 'findByPk').resolves(null);

//       const result = await teamModel.findById(1);

//       expect(findByPkStub.calledOnceWith(1)).to.be.true;
//       expect(result).to.be.null;

//       findByPkStub.restore();
//     });
//   });
// });
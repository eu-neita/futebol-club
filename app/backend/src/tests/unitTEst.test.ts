import { expect } from 'chai';
import * as sinon from 'sinon';
import MatcheService from '../services/matcheService';
// @ts-ignore
import MatcheModel from '../models/MatcheModel';

describe('MatcheService', () => {
  describe('finishedMatch', () => {
    it('should return a success message when the match is updated', async () => {
      const matcheModel = new MatcheModel();
      const matcheService = new MatcheService(matcheModel);

      const updateByIdStub = sinon.stub(matcheModel, 'updateById').resolves('1');

      const result = await matcheService.finishedMatch(1);

      expect(updateByIdStub.calledOnceWith(1)).to.be.true;
      expect(result.status).to.equal(200);
      expect(result.data).to.deep.equal({ message: '1' });

      updateByIdStub.restore();
    });

    it('should return an error message when the match is not found', async () => {
      const matcheModel = new MatcheModel();
      const matcheService = new MatcheService(matcheModel);

      const updateByIdStub = sinon.stub(matcheModel, 'updateById').resolves(undefined);

      const result = await matcheService.finishedMatch(1);

      expect(updateByIdStub.calledOnceWith(1)).to.be.true;
      expect(result.status).to.equal(400);
      expect(result.data).to.deep.equal({ message: 'id not found' });

      updateByIdStub.restore();
    });
  });
});

describe('MatcheService', () => {
  describe('getAllMatches', () => {
    it('should return all matches when no parameter is passed', async () => {
      const matcheModel = new MatcheModel();
      const matcheService = new MatcheService(matcheModel);

      const findAllStub = sinon.stub(matcheModel, 'findAll').resolves([{ id: 1 }, { id: 2 }] as any);

      const result = await matcheService.getAllMatches(undefined);

      expect(findAllStub.calledOnce).to.be.true;
      expect(result.status).to.equal(200);
      expect(result.data).to.deep.equal([{ id: 1 }, { id: 2 }]);

      findAllStub.restore();
    });

    it('should return only in progress matches when parameter is "true"', async () => {
      const matcheModel = new MatcheModel();
      const matcheService = new MatcheService(matcheModel);

      const findAllStub = sinon.stub(matcheModel, 'findAll').resolves([
        { id: 1, inProgress: true },
        { id: 2, inProgress: false },
        { id: 3, inProgress: true },
      ]as any);

      const result = await matcheService.getAllMatches('true');

      expect(findAllStub.calledOnce).to.be.true;
      expect(result.status).to.equal(200);
      expect(result.data).to.deep.equal([{ id: 1, inProgress: true }, { id: 3, inProgress: true }]);

      findAllStub.restore();
    });

    it('should return only finished matches when parameter is "false"', async () => {
      const matcheModel = new MatcheModel();
      const matcheService = new MatcheService(matcheModel);

      const findAllStub = sinon.stub(matcheModel, 'findAll').resolves([
        { id: 1, inProgress: true },
        { id: 2, inProgress: false },
        { id: 3, inProgress: true },
      ]as any);

      const result = await matcheService.getAllMatches('false');

      expect(findAllStub.calledOnce).to.be.true;
      expect(result.status).to.equal(200);
      expect(result.data).to.deep.equal([{ id: 2, inProgress: false }]);

      findAllStub.restore();
    });
  });
});
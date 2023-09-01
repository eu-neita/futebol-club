import * as chai from 'chai';
import * as sinon from 'sinon';
import 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');
import jwtVerificated, { removeBarrer } from '../middlewares//jwtVerificateTokenMiddleware';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

chai.use(chaiHttp);

describe('jwtVerificated middleware', () => {
  it('should set email parameter in request', async () => {
    const token = jwt.sign({ email: 'test@example.com' }, 'secret');
    const authorization = `Bearer ${token}`;
    const req = {
      headers: {
        authorization,
      },
      params: {},
    } as Request;
    const res = {} as Response;
    const next = sinon.spy();

    const decodeStub = sinon.stub(jwt, 'decode').returns({ email: 'test@example.com' });

    await jwtVerificated(req, res, next);

    chai.expect(req.params.email).to.equal('test@example.com');
    chai.expect(decodeStub.calledOnceWith(removeBarrer(authorization))).to.be.true;
    chai.expect(next.calledOnce).to.be.true;

    decodeStub.restore();
  });
});
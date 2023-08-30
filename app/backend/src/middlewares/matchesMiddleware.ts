import { Request, Response, NextFunction } from 'express';
import TeamModel from '../models/TeamModel';

const matchesVerificated = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams' });
  }
  const teamModel = new TeamModel();
  const allTeams = await teamModel.findAll();
  const verificatedRegistredHome = allTeams
    .some((team: { id: number }) => team.id === homeTeamId)
    && allTeams.some((team: { id: number }) => team.id === awayTeamId);
  if (!verificatedRegistredHome) {
    return res.status(404).json({
      message: 'There is no team with such id!' });
  }
  return next();
};

export default matchesVerificated;

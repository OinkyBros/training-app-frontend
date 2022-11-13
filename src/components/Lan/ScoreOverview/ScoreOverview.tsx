import React, { ReactNode, useEffect, useState } from 'react';
import MatchService from '../../../services/Matches';
import Match from '../../../types/Match';
import Grid from '../../GridLayout/Grid';
import GridItem from '../../GridLayout/GridItem';
import ScoreCard from './ScoreCard';
import styles from './ScoreOverview.module.scss';

type PlayerScore = {
  summonerName: string,
  totalCS: number,
  totalKills: number,
  totalAssists: number;
  totalDeaths: number;
}

function ScoreOverview() {
	const [matches, setMatches] = useState<Match[]>([]);

	const matchElements: React.ReactElement[] = [];

  useEffect(() => {
	  MatchService.getMatches().then(async (newMatches) => {
      const ms: Match[] = [];

      for(let m of newMatches) {
        ms.push(await MatchService.getMatch(m.MatchID));
      }

      setMatches(ms);
    }
  )}, []);

  const players = matches.flatMap((m) => m.Teams).flatMap((t) => t.Participants).filter((p) => p.IsOinky);
  const playerScores: Map<string, PlayerScore> = new Map();

  players.forEach((p) => {
    const summ = playerScores.get(p.SummonerName) ?? {
      summonerName: p.SummonerName,
      totalKills: p.Kills,
      totalAssists: p.Assists,
      totalDeaths: p.Deaths,
      totalCS: p.CS,
    } as PlayerScore;

    summ.totalCS += p.CS;
    summ.totalKills += p.Kills;
    summ.totalAssists += p.Assists;
    summ.totalDeaths += p.Deaths;

    playerScores.set(p.SummonerName, summ);
  });

  const scoreItem = (children: ReactNode) => (
    <GridItem xs={12} sm={6} md={4} lg={3} xl={2}>
      {children}
    </GridItem>
  );

  console.table(playerScores);
  
  const killCard = () => {
    const ks = [...playerScores.values()].sort((a, b) => b.totalKills - a.totalKills);

    return (
      <ScoreCard title="Total Kills" p1={ks.at(0)?.summonerName ?? ''} p2={ks.at(1)?.summonerName ?? ''} p3={ks.at(2)?.summonerName ?? ''} />
    );
  };
  
  const assistCard = () => {
    const ks = [...playerScores.values()].sort((a, b) => b.totalAssists - a.totalAssists);

    return (
      <ScoreCard title="Total Assists" p1={ks.at(0)?.summonerName ?? ''} p2={ks.at(1)?.summonerName ?? ''} p3={ks.at(2)?.summonerName ?? ''} />
    );
  };
  
  const deathCard = () => {
    const ks = [...playerScores.values()].sort((a, b) => b.totalDeaths - a.totalDeaths);

    return (
      <ScoreCard title="Total Deaths" p1={ks.at(0)?.summonerName ?? ''} p2={ks.at(1)?.summonerName ?? ''} p3={ks.at(2)?.summonerName ?? ''} />
    );
  };
  
  const csCard = () => {
    const ks = [...playerScores.values()].sort((a, b) => b.totalCS - a.totalCS);

    return (
      <ScoreCard title="Total CS" p1={ks.at(0)?.summonerName ?? ''} p2={ks.at(1)?.summonerName ?? ''} p3={ks.at(2)?.summonerName ?? ''} />
    );
  };

  return (
      <Grid>
        {scoreItem(killCard())}
        {scoreItem(assistCard())}
        {scoreItem(deathCard())}
        {scoreItem(csCard())}
      </Grid>
  );
}

export default ScoreOverview;
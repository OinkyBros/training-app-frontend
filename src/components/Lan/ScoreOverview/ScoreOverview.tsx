import React, { ReactNode, useEffect, useState } from 'react';
import GoalService from '../../../services/Goals';
import MatchService from '../../../services/Matches';
import Match from '../../../types/Match';
import Grid from '../../GridLayout/Grid';
import GridItem from '../../GridLayout/GridItem';
import ScoreCard from './ScoreCard';
import styles from './ScoreOverview.module.scss';

type PlayerScore = {
  summonerName: string,
  totalCS: number,
  averageCS: number,
  totalKills: number,
  averageKills: number;
  totalAssists: number;
  averageAssists: number;
  totalDeaths: number;
  averageDeaths: number;
  matches: number;
}

function ScoreOverview() {
  GoalService.getGoals().then((goalOverview) => {
    console.log(`goalOverview: ${JSON.stringify(goalOverview)}`);
  }).catch((e: any) => {
    console.log(e);
  });


  const [loading, setLoading] = useState<boolean>(true);
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

  useEffect(() => {
    setLoading(matches.length <= 0);
  }, [matches]);

  const players = matches.flatMap((m) => m.Teams).flatMap((t) => t.Participants).filter((p) => p.IsOinky);
  const playerScores: Map<string, PlayerScore> = new Map();

  players.forEach((p) => {
    const summ = playerScores.get(p.SummonerName) ?? {
      summonerName: p.SummonerName,
      totalKills: 0,
      averageKills: 0,
      totalAssists: 0,
      averageAssists: 0,
      totalDeaths: 0,
      averageDeaths: 0,
      totalCS: 0,
      averageCS: 0,
      matches: 0,
    } as PlayerScore;

    summ.totalCS += p.CS;
    summ.totalKills += p.Kills;
    summ.totalAssists += p.Assists;
    summ.totalDeaths += p.Deaths;
    summ.matches += 1;

    playerScores.set(p.SummonerName, summ);
  });

  playerScores.forEach((p, key) => {
    p.averageKills = p.totalKills / p.matches;
    p.averageAssists = p.totalAssists / p.matches;
    p.averageDeaths = p.totalDeaths / p.matches;
    p.averageCS = p.totalCS / p.matches;
    playerScores.set(key, p);
  })

  const scoreItem = (children: ReactNode) => (
    <GridItem xs={12} sm={6} md={4} lg={3} xl={2}>
      {children}
    </GridItem>
  );
  
  const killCard = () => {
    const ks = [...playerScores.values()].sort((a, b) => b.totalKills - a.totalKills);

    return (
      <ScoreCard
        title="Total Kills"
        p1={ks.at(0)?.summonerName ?? ''}
        p1Value={ks.at(0)?.totalKills ?? 0}
        p2={ks.at(1)?.summonerName ?? ''}
        p2Value={ks.at(1)?.totalKills ?? 0}
        p3={ks.at(2)?.summonerName ?? ''}
        p3Value={ks.at(2)?.totalKills ?? 0}
      />
    );
  };
  
  const assistCard = () => {
    const ks = [...playerScores.values()].sort((a, b) => b.totalAssists - a.totalAssists);

    return (
      <ScoreCard
        title="Total Assists"
        p1={ks.at(0)?.summonerName ?? ''}
        p1Value={ks.at(0)?.totalAssists ?? 0}
        p2={ks.at(1)?.summonerName ?? ''}
        p2Value={ks.at(1)?.totalAssists ?? 0}
        p3={ks.at(2)?.summonerName ?? ''}
        p3Value={ks.at(2)?.totalAssists ?? 0}
      />
    );
  };
  
  const deathCard = () => {
    const ks = [...playerScores.values()].sort((a, b) => b.totalDeaths - a.totalDeaths);

    return (
      <ScoreCard
        title="Total Deaths"
        p1={ks.at(0)?.summonerName ?? ''}
        p1Value={ks.at(0)?.totalDeaths ?? 0}
        p2={ks.at(1)?.summonerName ?? ''}
        p2Value={ks.at(1)?.totalDeaths ?? 0}
        p3={ks.at(2)?.summonerName ?? ''}
        p3Value={ks.at(2)?.totalDeaths ?? 0}
      />
    );
  };
  
  const csCard = () => {
    const ks = [...playerScores.values()].sort((a, b) => b.totalCS - a.totalCS);

    return (
      <ScoreCard
        title="Total CS"
        p1={ks.at(0)?.summonerName ?? ''}
        p1Value={ks.at(0)?.totalCS ?? 0}
        p2={ks.at(1)?.summonerName ?? ''}
        p2Value={ks.at(1)?.totalCS ?? 0}
        p3={ks.at(2)?.summonerName ?? ''}
        p3Value={ks.at(2)?.totalCS ?? 0}
      />
    );
  };
  
  const avKillCard = () => {
    const ks = [...playerScores.values()].sort((a, b) => b.averageKills - a.averageKills);

    return (
      <ScoreCard
        title="Kills/Game"
        p1={ks.at(0)?.summonerName ?? ''}
        p1Value={ks.at(0)?.averageKills ?? 0}
        p2={ks.at(1)?.summonerName ?? ''}
        p2Value={ks.at(1)?.averageKills ?? 0}
        p3={ks.at(2)?.summonerName ?? ''}
        p3Value={ks.at(2)?.averageKills ?? 0}
      />
    );
  };
  
  const avAssistsCard = () => {
    const ks = [...playerScores.values()].sort((a, b) => b.averageAssists - a.averageAssists);

    return (
      <ScoreCard
        title="Assists/Game"
        p1={ks.at(0)?.summonerName ?? ''}
        p1Value={ks.at(0)?.averageAssists ?? 0}
        p2={ks.at(1)?.summonerName ?? ''}
        p2Value={ks.at(1)?.averageAssists ?? 0}
        p3={ks.at(2)?.summonerName ?? ''}
        p3Value={ks.at(2)?.averageAssists ?? 0}
      />
    );
  };
  
  const avDeathsCard = () => {
    const ks = [...playerScores.values()].sort((a, b) => b.averageDeaths - a.averageDeaths);

    return (
      <ScoreCard
        title="Deaths/Game"
        p1={ks.at(0)?.summonerName ?? ''}
        p1Value={ks.at(0)?.averageDeaths ?? 0}
        p2={ks.at(1)?.summonerName ?? ''}
        p2Value={ks.at(1)?.averageDeaths ?? 0}
        p3={ks.at(2)?.summonerName ?? ''}
        p3Value={ks.at(2)?.averageDeaths ?? 0}
      />
    );
  };
  
  const avCSCard = () => {
    const ks = [...playerScores.values()].sort((a, b) => b.averageCS - a.averageCS);

    return (
      <ScoreCard
        title="CS/Game"
        p1={ks.at(0)?.summonerName ?? ''}
        p1Value={ks.at(0)?.averageCS ?? 0}
        p2={ks.at(1)?.summonerName ?? ''}
        p2Value={ks.at(1)?.averageCS ?? 0}
        p3={ks.at(2)?.summonerName ?? ''}
        p3Value={ks.at(2)?.averageCS ?? 0}
      />
    );
  };

  return loading ? <div className={styles.loadingScreen}>Loading</div> : (
    <Grid>
        {scoreItem(killCard())}
        {scoreItem(assistCard())}
        {scoreItem(deathCard())}
        {scoreItem(csCard())}
        {scoreItem(avKillCard())}
        {scoreItem(avAssistsCard())}
        {scoreItem(avDeathsCard())}
        {scoreItem(avCSCard())}
    </Grid>
  );
}

export default ScoreOverview;
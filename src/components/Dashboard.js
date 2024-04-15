import React, { useState, useEffect } from 'react';
import BotManager from './BotManager';
import TradeVisualizer from './TradeVisualizer';
import { Grid, Paper } from '@mui/material/Button';

const Dashboard = () => {
  const [bots, setBots] = useState([]);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    // Fetch the bot and trade data from an API or use mock data
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <h1>Dashboard</h1>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <BotManager bots={bots} setBots={setBots} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TradeVisualizer trades={trades} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

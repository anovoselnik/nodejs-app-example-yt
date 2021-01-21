const express = require('express');
const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: ['knex', 'public'],
});

app.get('/', (req, res) => {
  knex.raw('select 1+1 as result').then(() => 
    res.send('Connected to the database successfully.')
  ).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

app.listen(port, host, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
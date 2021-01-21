const express = require('express');
const app = express();
const port = 3000;

const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://postgres@localhost:5432/test',
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.PRIVATE_DOMAIN || '0.0.0.0';

console.log(process.env.CA_CERT);

const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/test',
    ssl: {
      ca: process.env.CA_CERT,
      rejectUnauthorized: false
    }
  },
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
  console.log(`Example app listening at http://${host}:${port}`)
});
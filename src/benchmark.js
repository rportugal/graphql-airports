const autocannon = require('autocannon');

const query = `{
  airports {
    icao
    iata
    name
    city
    state
    country
    coordinate {
      longitude
      latitude
      elevation
    }
    timezone
  }
}`;

const variables = {};

const body = JSON.stringify({ query, variables });

autocannon(
  {
    url: 'http://localhost:4000/graphql',
    connections: 10,
    pipelining: 1,
    duration: 10,
    amount: 100,
    body,
    headers: {
      'content-type': 'application/json'
    }
  },
  console.log
);

const autocannon = require("autocannon");
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
console.log(body);
const instance = autocannon(
  {
    url: "http://localhost:4000/graphql",
    method: "POST",
    duration: 10,
    connections: 40,
    body,
    headers: {
      "content-type": "application/json",
    },
    workers: 4,
  },
  console.log
);

autocannon.track(instance);

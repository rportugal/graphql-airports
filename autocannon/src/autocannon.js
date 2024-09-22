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
const instance = autocannon(
  {
    url: "http://localhost:4000/graphql",
    method: "POST",
    duration: 60,
    body,
    headers: {
      "content-type": "application/json",
    },
  },
  console.log
);

autocannon.track(instance);

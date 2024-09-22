import http from "k6/http";
import { check } from "k6";

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

const headers = { "content-type": "application/json" };

export default function () {
  const url = "http://localhost:4000/graphql";
  const res = http.post(url, body, { headers });
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
}

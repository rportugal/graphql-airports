const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const os = require('os');
const path = require('path');

// var lastUsedHeap = 0; // remember the heap size

// function checkMemory() {
//   // console.log('checkmemory');
//   //   // check if the heap size is this cycle is LESS than what we had last
//   //   // cycle; if so, then the garbage collector has kicked in

//   // console.log(process.memoryUsage().heapUsed);
//   if (process.memoryUsage().heapUsed < lastUsedHeap) {
//     console.log('Garbage collected!');
//   }
//   lastUsedHeap = process.memoryUsage().heapUsed;
// }

// setInterval(checkMemory, 100); // test 10 times per second

const typeDefs = `
type Coordinate {
  longitude: Float
  latitude: Float
  elevation: Float
}

type Airport {
  icao: String
  iata: String
  name: String
  city: String
  state: String
  country: String
  coordinate: Coordinate
  timezone: String
}

type Query {
  airports: [Airport]
}`;

const mockData = {
  '00AK': {
    icao: '00AK',
    iata: '',
    name: 'Lowell Field',
    city: 'Anchor Point',
    state: 'Alaska',
    country: 'US',
    elevation: 450,
    lat: 59.94919968,
    lon: -151.695999146,
    tz: 'America/Anchorage'
  },
  '00AL': {
    icao: '00AL',
    iata: '',
    name: 'Epps Airpark',
    city: 'Harvest',
    state: 'Alabama',
    country: 'US',
    elevation: 820,
    lat: 34.8647994995,
    lon: -86.7703018188,
    tz: 'America/Chicago'
  },
  '00AZ': {
    icao: '00AZ',
    iata: '',
    name: 'Cordes Airport',
    city: 'Cordes',
    state: 'Arizona',
    country: 'US',
    elevation: 3810,
    lat: 34.3055992126,
    lon: -112.1650009155,
    tz: 'America/Phoenix'
  },
  '00CA': {
    icao: '00CA',
    iata: '',
    name: 'Goldstone /Gts/ Airport',
    city: 'Barstow',
    state: 'California',
    country: 'US',
    elevation: 3038,
    lat: 35.3504981995,
    lon: -116.888000488,
    tz: 'America/Los_Angeles'
  },
  '00CO': {
    icao: '00CO',
    iata: '',
    name: 'Cass Field',
    city: 'Briggsdale',
    state: 'Colorado',
    country: 'US',
    elevation: 4830,
    lat: 40.6222000122,
    lon: -104.34400177,
    tz: 'America/Denver'
  },
  '00FA': {
    icao: '00FA',
    iata: '',
    name: 'Grass Patch Airport',
    city: 'Bushnell',
    state: 'Florida',
    country: 'US',
    elevation: 53,
    lat: 28.6455001831,
    lon: -82.21900177,
    tz: 'America/New_York'
  },
  '00FL': {
    icao: '00FL',
    iata: '',
    name: 'River Oak Airport',
    city: 'Okeechobee',
    state: 'Florida',
    country: 'US',
    elevation: 35,
    lat: 27.2308998108,
    lon: -80.9692001343,
    tz: 'America/New_York'
  },
  '00GA': {
    icao: '00GA',
    iata: '',
    name: 'Lt World Airport',
    city: 'Lithonia',
    state: 'Georgia',
    country: 'US',
    elevation: 700,
    lat: 33.7675018311,
    lon: -84.0682983398,
    tz: 'America/New_York'
  }
};
const airports = require(path.join(process.cwd(), 'Airports', 'airports.json'));
const resolvers = {
  Query: {
    airports: () => Object.values(airports)
    // airports: () => Object.values(mockData)
  },
  Airport: {
    coordinate: obj => obj,
    timezone: obj => obj.tz
  },
  Coordinate: {
    longitude: obj => obj.lon,
    latitude: obj => obj.lat,
    elevation: obj => obj.elevation
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('Listening on port 4000!');
});

const { makeExecutableSchema } = require("graphql-tools");
const path = require("path");
const { ApolloServer } = require("@apollo/server");

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

const airports = require(
  path.join(process.cwd(), "..", "Airports", "airports.json")
);

const resolvers = {
  Query: {
    airports: () => Object.values(airports),
  },
  Airport: {
    coordinate: (obj) => obj,
    timezone: (obj) => obj.tz,
  },
  Coordinate: {
    longitude: (obj) => obj.lon,
    latitude: (obj) => obj.lat,
    elevation: (obj) => obj.elevation,
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const testServer = new ApolloServer({
  schema,
});

module.exports = { testServer };

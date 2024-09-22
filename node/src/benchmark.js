const { testServer } = require("./index");

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

(async () => {
  try {
    const start = Date.now();
    for (let i = 0; i < 500; i++) {
      await testServer.executeOperation({
        query,
      });
    }
    const end = Date.now();
    console.log("test duration:", (end - start) / 1000, "s");
  } catch (e) {
    console.error("something wrong", e);
  }
})();

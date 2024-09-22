const { testServer } = require("./index");
const { startStandaloneServer } = require("@apollo/server/standalone");

(async () => {
  try {
    const { url } = await startStandaloneServer(testServer, {
      listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (e) {
    console.error("something wrong", e);
  }
})();

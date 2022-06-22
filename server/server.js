import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";

import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { fileURLToPath } from "url";
import { resolvers } from "./src/graphql/resolvers/index.js";
import { connectDatabase } from "./src/config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./src/graphql/schema/**/*.gql"))
);

dotenv.config({ path: "./src/config/.env" });
const app = express();

const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin.
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// More required logic for integrating with Express
await apolloServer.start();
apolloServer.applyMiddleware({
  app,

  // By default, apollo-server hosts its GraphQL endpoint at the
  // server root. However, *other* Apollo Server packages host it at
  // /graphql. Optionally provide this to match apollo-server.
  path: "/graphql",
});

// connect database
connectDatabase();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("server has started at ", port);
  console.log(
    `graphql server has started at ${port}${apolloServer.graphqlPath}`
  );
});

const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('@apollo/server');

const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');

const cors = require('cors');

const { typeDefs, resolvers } = require('./schemas');
const { __Directive } = require('graphql');

const PORT = process.env.PORT || 3001;
const app = express();


const server = new ApolloServer({
  typeDefs,
  resolvers
});



const startApolloServer = async () => {
  await server.start();
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // if we're in production, serve client/build as static assets
  app.use('/graphql', expressMiddleware(server));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  

  
  
  
  app.use(routes);
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
    });
  });
};

startApolloServer();


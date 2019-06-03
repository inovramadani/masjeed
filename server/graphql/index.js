const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

module.exports = (app, port) => {
  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });
  console.log(`🚀 Apollo server ready at http://localhost:${port}${server.graphqlPath}`)
}
import 'dotenv/config';
import { ApolloServer } from 'apollo-server';

import { Queries } from './graphql/Queries.js';
import { Mutations } from './graphql/Mutations.js';
import { Type } from './graphql/Types.js';
import {
  CollectionItemType,
  CollectionItemLegoType,
  CollectionItemVideoGameType,
} from './graphql/CollectionItemType.js';
import {
  CollectionItemLegoInput,
  CollectionItemVideoGameInput,
} from './graphql/CollectionItemInput.js';
import { miscTypes, miscInputs } from './graphql/misc.js';
import { resolvers } from './graphql/resolvers.graphql.js';
import verifyToken from "./utils/verifyToken.js";

/**
 * Create an Apollo server instance.
 */
const server = new ApolloServer({
  typeDefs: [
    Queries,
    Mutations,
    Type,
    CollectionItemType,
    CollectionItemLegoType,
    CollectionItemVideoGameType,
    CollectionItemLegoInput,
    CollectionItemVideoGameInput,
    miscTypes,
    miscInputs,
  ],
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  context: async ({req, ...rest}) => {
    let isAuthenticated = false;
    try {
      const authHeader = req.headers.authorization || '';
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        const payload = await verifyToken(token);
        isAuthenticated = payload && payload.sub ? true : false;
      }
    } catch (error) {
      console.error(error);
    }
    return { ...rest, req, auth: { isAuthenticated } };
  }
});



/**
 * Create an express server and apply the Apollo Server middleware
 */

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

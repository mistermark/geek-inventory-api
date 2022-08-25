import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';

import { Queries } from './graphql/Queries.js';
import { Mutations } from './graphql/Mutations.js';
import { Type } from './graphql/Types.js';
import {
  CollectionItemType,
  CollectionItemLegoType,
  CollectionItemVideoGameType
} from './graphql/CollectionItemType.js';
import { CollectionItemLegoInput, CollectionItemVideoGameInput } from './graphql/CollectionItemInput.js';
import { miscTypes, miscInputs } from './graphql/misc.js';
import { resolvers } from './graphql/resolvers.graphql.js';

dotenv.config();

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
});

/**
 * Create an express server and apply the Apollo Server middleware
 */

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

import { gql } from 'apollo-server';

export const Queries = gql`
  type Query {
    types: [Type]
    item(id: String!): CollectionItemType
    collectionItems: [CollectionItemType]
    collectionItemsByType(type: String!): [CollectionItemType]
  }
`;

// series: String
// manufacturer: String
// platform: String
// genre: [String]
// developer: String
// rating: String
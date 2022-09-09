import { gql } from 'apollo-server';

export const Queries = gql`
  type Query {
    types(username: String!): [Type]
    getInventory(username: String!): [Item]
    item(id: String!): Item
    collectionItems: [Item]
    itemsByType(type: String!, username: String): [Item]
  }
`;

// series: String
// manufacturer: String
// platform: String
// genre: [String]
// developer: String
// rating: String
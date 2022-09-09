export const Mutations = `
  type Mutation {
    createCollectionItemLego(data: CollectionItemLegoInput): mutateCollectionItemLegoResponse
    createCollectionItemVideoGame(data: CollectionItemVideoGameInput): mutateCollectionItemVideoGameResponse
    updateCollectionItemLego(data: CollectionItemLegoInput!): mutateCollectionItemLegoResponse
    updateCollectionItemVideoGame(data: CollectionItemVideoGameInput!): mutateCollectionItemVideoGameResponse
    deleteItem(id: String!): deleteItemResponse
    addToInventory(id: String!, username: String!): mutateGeneralResponse
    removeFromInventory(id: String!, username: String!): mutateGeneralResponse
  }
`;
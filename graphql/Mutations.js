export const Mutations = `
  type Mutation {
    createCollectionItemLego(data: CollectionItemLegoInput): mutateCollectionItemLegoResponse
    createCollectionItemVideoGame(data: CollectionItemVideoGameInput): mutateCollectionItemVideoGameResponse
    updateCollectionItemLego(data: CollectionItemLegoInput!): mutateCollectionItemLegoResponse
    updateCollectionItemVideoGame(data: CollectionItemVideoGameInput!): mutateCollectionItemVideoGameResponse
    deleteCollectionItem(id: String!): deleteItemResponse
  }
`;
const CollectionItemLegoInput = `
  type mutateCollectionItemLegoResponse {
    code: Int
    message: String
    data: CollectionItemLegoType
  }

  input MetaLegoInput {
    theme: String
    subtheme: String
    number: String
    minifigs: Int
    pieces: Int
  }

  input CollectionItemLegoInput {
    _id: String
    type: String
    name: String
    state: String
    quantity: Int
    release_date: String
    price: PriceInput
    ean: String
    link: RefUrlInput
    meta: MetaLegoInput
  }
`;

const CollectionItemVideoGameInput = `
  type mutateCollectionItemVideoGameResponse {
    code: Int
    message: String
    data: CollectionItemVideoGameType
  }

  input VideoGameGenreInput {
    name: String
    type: String
  }
  
  input MetaVideoGameInput {
    platform: String
    genre: [VideoGameGenreInput]
    developer: String
    rating: String
  }

  input CollectionItemVideoGameInput {
    _id: String
    type: String
    name: String
    state: String
    quantity: Int
    release_date: String
    price: PriceInput
    ean: String
    link: RefUrlInput
    meta: MetaVideoGameInput
  }
`

export {
  CollectionItemLegoInput,
  CollectionItemVideoGameInput
}
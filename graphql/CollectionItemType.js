const CollectionItemLegoType = `
  type CollectionItemLegoType {
    _id: ID
    type: String
    name: String
    state: String
    quantity: Int
    release_date: String
    price: Price
    ean: String
    link: RefUrl

    # LEGO
    theme: String
    subtheme: String
    number: String
    minifigs: Int
    pieces: Int
  }
`;

const CollectionItemVideoGameType = `
  type VideoGameGenre {
    name: String
    type: String
  }

  type CollectionItemVideoGameType {
    _id: ID
    type: String
    name: String
    state: String
    quantity: Int
    release_date: String
    price: Price
    ean: String
    link: RefUrl

    # VideoGame
    platform: String
    genre: [VideoGameGenre]
    developer: String
    rating: String
  }
`

const Item = `
  type CollectionItemMetaData {
    # VideoGame
    platform: String
    genre: [VideoGameGenre]
    developer: String
    rating: String

    # Nendoroid
    series: String
    manufacturer: String

    # LEGO
    theme: String
    subtheme: String
    number: String
    minifigs: Int
    pieces: Int
  }

  type Item {
    _id: ID
    type: String
    name: String
    state: String
    quantity: Int
    release_date: String
    price: Price
    ean: String
    link: RefUrl
    meta: CollectionItemMetaData
  }
  `

  export {
    Item,
    CollectionItemLegoType,
    CollectionItemVideoGameType
  }
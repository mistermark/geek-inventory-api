const miscTypes = `
  type RefUrl {
    url: String
    name: String
  }
  type Price {
    amount: Float
    currency: String
  }
  type deleteItemResponse {
    code: Int
    message: String
  }
`;

const miscInputs = `
  input PriceInput {
    amount: Float
    currency: String
  }
  input RefUrlInput {
    url: String
    name: String
  }
`;

export {
    miscTypes,
    miscInputs
}
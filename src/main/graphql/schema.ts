export default `#graphql
  type Card {
    id: ID!
    deckId: ID!
    term: String!
    definition: String!
  }

  type Deck {
    id: String!
    title: String!
  }

  type Query {
    hello: String!
  }

  type Mutation {
    addCard(deckId: ID!, term: String!, definition: String!): Card!
    addDeck(title: String!): Deck!
  }
`

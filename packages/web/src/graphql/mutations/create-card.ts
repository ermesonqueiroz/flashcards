import { gql } from '@apollo/client'

export const CREATE_CARD = gql`
  mutation Card($term: String!, $deckId: ID!, $definition: String!) {
    addCard(term: $term, deckId: $deckId, definition: $definition) {
      statusCode,
      body {
        id,
        deckId,
        term,
        definition,
      },
      error {
        name,
        message
      }
    }
  }
`

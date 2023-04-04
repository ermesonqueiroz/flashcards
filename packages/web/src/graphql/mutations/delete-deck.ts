import { gql } from '@apollo/client'

export const DELETE_DECK = gql`
  mutation Deck($id: ID!) {
    deleteDeck(id: $id) {
      statusCode,
      body {
        id,
        title
      },
      error {
        name,
        message
      }
    }
  }
`

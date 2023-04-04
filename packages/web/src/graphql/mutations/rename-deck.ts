import { gql } from '@apollo/client'

export const RENAME_DECK = gql`
  mutation Deck($id: ID!, $title: String!) {
    renameDeck(id: $id, title: $title) {
      statusCode,
      error {
        name,
        message
      }
    }
  }
`

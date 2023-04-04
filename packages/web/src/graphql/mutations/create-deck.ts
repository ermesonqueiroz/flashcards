import { gql } from '@apollo/client'

export const CREATE_DECK = gql`
  mutation Deck($title: String!) {
    addDeck(title: $title) {
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

import { gql } from '@apollo/client'

export const GET_ALL_DECKS = gql`
  query Decks {
    decks {
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
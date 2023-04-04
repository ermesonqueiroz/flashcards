import { gql } from '@apollo/client'

export const GET_ALL_CARDS = gql`
  query Cards {
    cards {
      statusCode,
      body {
        id,
        deckId,
        term,
        definition,
        lastView,
        lastDifficulty
      },
      error {
        name,
        message
      }
    }
  }
`
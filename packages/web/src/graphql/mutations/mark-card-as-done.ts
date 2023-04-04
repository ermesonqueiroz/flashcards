import { gql } from '@apollo/client'

export const MARK_CARD_AS_DONE = gql`
  mutation Card($cardId: ID!, $difficulty: Int!) {
    cardDone(cardId: $cardId, difficulty: $difficulty) {
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

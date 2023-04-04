import { Flex, Heading } from '@chakra-ui/react'
import { cardReadyToReview } from '../common/cardReadyToReview'
import { Deck } from '../components/Deck'
import { Page } from '../components/Page'
import { useAppSelector } from '../hooks/redux'

export function Home() {
  const decks = useAppSelector((state) => state.decks)
  const cards = useAppSelector((state) => state.cards)
  
  return (
    <Page>
      <Flex
        p={10}
        direction="column"
      >
        <Heading
          fontSize="3xl"
        >
          Suas Coleções
        </Heading>

        <Flex
          gap={4}
          my={4}
          wrap="wrap"
          w="full"
        >
          {
            decks.map((deck) => (
              <Deck
                key={deck.id}
                id={deck.id}
                title={deck.title}
                termsToReview={
                  cards
                    .filter(({ deckId, lastView, lastDifficulty }) => {
                      return deck.id === deckId
                        && cardReadyToReview(lastView, lastDifficulty!)
                    })
                    .length
                }
                termsLength={
                  cards
                    .filter(({ deckId }) => deck.id === deckId)
                    .length
                }
              />
            ))
          }
        </Flex>
      </Flex>
    </Page>
  )
}

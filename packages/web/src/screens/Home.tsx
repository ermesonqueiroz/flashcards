import { Flex, Heading } from '@chakra-ui/react'
import { cardReadyToReview } from '../common/cardReadyToReview'
import { Deck } from '../components/Deck'
import { Page } from '../components/Page'
import { useAppSelector } from '../hooks/redux'

export function Home() {
  const decks = useAppSelector((state) => state.decks)
  
  return (
    <Page>
      <Flex
        p={10}
        direction="column"
      >
        <Heading
          fontSize="2xl"
        >
          Coleções
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
                title={deck.name}
                termsToReview={
                  deck.cards
                    .filter(({ lastView, lastDifficulty }) => cardReadyToReview(lastView!, lastDifficulty!))
                    .length
                }
                termsLength={deck.cards.length}
              />
            ))
          }
        </Flex>
      </Flex>
    </Page>
  )
}

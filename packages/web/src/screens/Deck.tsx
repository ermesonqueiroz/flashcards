import { useMutation } from "@apollo/client";
import { Box, Button, ButtonGroup, Collapse, Fade, Flex, Heading, ScaleFade, Slide, SlideFade, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cardReadyToReview } from "../common/cardReadyToReview";
import { Page } from "../components/Page";
import { MARK_CARD_AS_DONE } from "../graphql/mutations/mark-card-as-done";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { CardsActions } from "../lib/features/cards";
import { Card, CardDoneMutationResponse } from "../__generated__/graphql";

export function Deck() {
  const { deckId } = useParams()
  const deck = useAppSelector(state => state.decks.find(({ id }) => deckId === id))
  const cards = useAppSelector(state => state.cards.filter(card => {
    return card.deckId === deckId
      && cardReadyToReview(card?.lastView,  card?.lastDifficulty!)
  }))
  const [localCards, setLocalCards] = useState<Card[]>(cards)

  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const [markCardAsDone, { data }] = useMutation<{ cardDone: CardDoneMutationResponse }>(MARK_CARD_AS_DONE)
  const dispatch = useAppDispatch()
  
  const { isOpen: showDefinition, onToggle: toggleShowDefinition } = useDisclosure()
  const { isOpen: finishedDeck, onToggle: toggleFinishedDeck } = useDisclosure()

  useEffect(() => {
    setActiveCard(localCards[activeCardIndex])
  }, [activeCardIndex])

  useEffect(() => {
    if (data?.cardDone?.body) {
      dispatch(
        CardsActions.update({
          id: activeCard?.id!,
          data: data?.cardDone?.body,
        })
      )
    }
  }, [data])

  function nextCard() {
    console.log(cards)
    if (localCards[activeCardIndex + 1]) {
      toggleShowDefinition()
      setActiveCardIndex(activeCardIndex + 1)
    } else {
      toggleShowDefinition()
      setActiveCard(null)
      toggleFinishedDeck()
    }
  }

  async function submitHandle(difficulty: number) {
    await markCardAsDone({
      variables: {
        cardId: activeCard?.id,
        difficulty,
      }
    })

    nextCard()
  }

  return (
    <Page showFloatingButton={false}>
      <Box h="calc(100vh - 72px)">
        <Flex
          p={10}
          direction="column"
          h="full"
        >
          <Heading
            fontSize="3xl"
          >
            {deck?.title}
          </Heading>

          <SlideFade in={!finishedDeck}>
            <Text
              fontSize="lg"
              textAlign="justify"
            >
              {activeCard?.term}
            </Text>
          </SlideFade>

          <Collapse in={showDefinition} animateOpacity>
            <Heading
              fontSize="xl"
              mt={8}
            >
              Definição
            </Heading>

            <Text
              fontSize="lg"
              textAlign="justify"
            >
              {activeCard?.definition}
            </Text>
          </Collapse>

          <SlideFade in={finishedDeck}>
            <Text
              fontSize="lg"
              color="Highlight"
            >
              Não há nenhuma carta para revisar, no momento.
            </Text>
          </SlideFade>
        </Flex>

        {
          activeCard && (
            <Flex
              justifyContent="center"
              w="full"
              position="absolute"
              bottom={5}
            >
              {
                !showDefinition ? (
                  <Button
                    onClick={() => toggleShowDefinition()}
                    isDisabled={showDefinition}
                  >
                    Mostrar Definição
                  </Button>
                ) : (
                  <ButtonGroup variant="ghost" spacing={4}>
                    <Button onClick={() => submitHandle(1)}>
                      🥱 Fácil
                    </Button>
                    <Button onClick={() => submitHandle(3)}>
                      🤨 Médio
                    </Button>
                    <Button onClick={() => submitHandle(5)}>
                      😭 Difícil
                    </Button>
                  </ButtonGroup>
                )
              }
            </Flex>
          )
        }
      </Box>
    </Page>
  )
}
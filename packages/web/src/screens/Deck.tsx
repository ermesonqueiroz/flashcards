import { Box, Button, ButtonGroup, Card, CardBody, Collapse, Flex, Heading, SlideFade, Text, useDisclosure } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { cardReadyToReview } from "../common/cardReadyToReview";
import { Page } from "../components/Page";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useLoading } from "../hooks/loading";
import { cardService } from "../lib/services/card";
import { CardsActions } from "../lib/features/cards";

export function Deck() {
  const { deckId } = useParams()
  const deck = useAppSelector(state => state.decks.find(({ id }) => deckId == id))
  const cards = useMemo(() => deck?.cards.filter(card =>
    cardReadyToReview(card?.lastView!,  card?.lastDifficulty!)
  ) ?? [], [deck])

  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const activeCard = useMemo(
    () => cards[activeCardIndex],
    [cards, activeCardIndex]
  )

  const dispatch = useAppDispatch()
  const { loading, withLoading } = useLoading()
  
  const { isOpen: showDefinition, onToggle: toggleShowDefinition } = useDisclosure()
  const { isOpen: finishedDeck, onToggle: toggleFinishedDeck } = useDisclosure()

  const markCardAsDone = withLoading(async (cardId: string, difficulty: number) => {
    await cardService.markCardAsRead(cardId, difficulty)
  })

  function nextCard() {
    if (cards[activeCardIndex + 1]) {
      toggleShowDefinition()
      setActiveCardIndex(activeCardIndex + 1)
    } else {
      toggleShowDefinition()
      toggleFinishedDeck()
    }
  }

  async function submitHandle(difficulty: number) {
    await markCardAsDone(activeCard?.id, difficulty)

    dispatch(
      CardsActions.update({
        id: activeCard?.id!,
        data: {
          lastDifficulty: difficulty,
          lastView: new Date().toISOString()
        },
      })
    )

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

          <Card w="md" size="sm" marginX="auto" marginTop={20}>
            <CardBody gap="2">
              <CardBody>
                <Collapse in={finishedDeck} animateOpacity>
                  <SlideFade in={finishedDeck}>
                    <Text
                      fontSize="lg"
                    >
                      Não há nenhuma carta para revisar, no momento.
                    </Text>
                  </SlideFade>
                </Collapse>
                <Collapse in={!finishedDeck} animateOpacity>
                  <SlideFade in={!finishedDeck}>
                    <Heading fontSize="xl">{deck?.name}</Heading>
                    <Text textAlign="justify" mt={2}>
                      {activeCard?.term}
                    </Text>
                  </SlideFade>
                </Collapse>
                <Collapse in={showDefinition} animateOpacity>
                  <Heading
                    fontSize="xl"
                    mt={8}
                  >
                    Definição
                  </Heading>

                  <Text textAlign="justify" mt={2}>
                    {activeCard?.definition}
                  </Text>
                </Collapse>
              </CardBody>
            </CardBody>
          </Card>

          {
            activeCardIndex < cards.length && (
              <Flex
                marginX="auto"
                mt={8}
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
                      <Button onClick={() => submitHandle(5)}>
                        🥱 Fácil
                      </Button>
                      <Button onClick={() => submitHandle(3)}>
                        🤨 Médio
                      </Button>
                      <Button onClick={() => submitHandle(1)}>
                        😭 Difícil
                      </Button>
                    </ButtonGroup>
                  )
                }
              </Flex>
            )
          }
        </Flex>
      </Box>
    </Page>
  )
}
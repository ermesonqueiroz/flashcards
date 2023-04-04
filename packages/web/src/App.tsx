import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { GET_ALL_CARDS } from "./graphql/queries/get-all-cards";
import { GET_ALL_DECKS } from "./graphql/queries/get-all-decks";
import { useAppDispatch } from "./hooks/redux";
import { CardsActions } from "./lib/features/cards";
import { DecksActions } from "./lib/features/decks";
import { Deck } from "./screens/Deck";
import { Home } from './screens/Home';
import { CardsQueryResponse, DecksQueryResponse } from "./__generated__/graphql";

function App() {
  const { data: decksData } = useQuery<{ decks: DecksQueryResponse }>(GET_ALL_DECKS)
  const { data: cardsData } = useQuery<{ cards: CardsQueryResponse }>(GET_ALL_CARDS)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(DecksActions.mount(decksData?.decks.body ?? []))
  }, [decksData])

  useEffect(() => {
    dispatch(CardsActions.mount(cardsData?.cards.body ?? []))
  }, [cardsData])

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/deck/:deckId"
        element={<Deck />}
      />
    </Routes>
  )
}

export default App

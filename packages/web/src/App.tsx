import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
import { DecksActions } from "./lib/features/decks";
import { Deck } from "./screens/Deck";
import { Home } from './screens/Home';
import { useQuery } from "./hooks/query";
import { Deck as DeckModel } from "./domain/deck";
import type { IndexDecksResponse } from "./lib/types/index-decks-response";

function App() {
  const dispatch = useAppDispatch()
  const { data: decksData, execute: fetchDecks } = useQuery<IndexDecksResponse>('/decks')

  useEffect(() => {
    fetchDecks()
  }, [])

  useEffect(() => {
    const data = decksData?.data
      .map(DeckModel.fromJSON)
      .map((deck) => deck.toJSON())

    dispatch(DecksActions.mount(data ?? []))
  }, [decksData])

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

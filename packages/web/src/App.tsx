import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
import { CardsActions } from "./lib/features/cards";
import { DecksActions } from "./lib/features/decks";
import { Deck } from "./screens/Deck";
import { Home } from './screens/Home';
import { useQuery } from "./hooks/query";
import type { Deck as DeckType } from "./domain/deck";

function App() {
  const dispatch = useAppDispatch()
  const { data: decksData, execute: fetchDecks } = useQuery<{ data: DeckType[] }>('/decks')

  useEffect(() => {
    fetchDecks()
  }, [])

  useEffect(() => {
    dispatch(DecksActions.mount(decksData?.data ?? []))
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

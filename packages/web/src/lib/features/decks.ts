import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Deck, DeckData } from "../../domain/deck";

const initialState: DeckData[] = []

export const decksSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    mount: (state, action: PayloadAction<DeckData[]>) => {
      return action.payload;
    },
    add: (state, action: PayloadAction<DeckData>) => {
      return [...state, action.payload]
    },
    delete: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter(({ id }) => action.payload.id !== id)
    },
    rename: (state, action: PayloadAction<DeckData>) => {
      return state.map(({ id, ...deck }) =>
        action.payload.id === id
          ? {
            id,
            ...deck,
            name: action.payload.name,
          } : {
            id,
            ...deck
          }
      )
    }
  }
})

export const DecksActions = decksSlice.actions;
export const decksReducer = decksSlice.reducer;

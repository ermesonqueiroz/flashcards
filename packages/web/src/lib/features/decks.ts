import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Deck } from "../../domain/deck";

const initialState: Deck[] = []

export const decksSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    mount: (state, action: PayloadAction<Deck[]>) => {
      return action.payload;
    },
    add: (state, action: PayloadAction<Deck>) => {
      return [...state, action.payload]
    },
    delete: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter(({ id }) => action.payload.id !== id)
    },
    rename: (state, action: PayloadAction<{ id: string, name: string }>) => {
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

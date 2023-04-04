import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../../__generated__/graphql";

const initialState: Card[] = []

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    mount: (state, action: PayloadAction<Card[]>) => {
      return action.payload;
    },
    add: (state, action: PayloadAction<Card>) => {
      return [...state, action.payload]
    },
    delete: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter(({ id }) => action.payload.id !== id)
    },
    update: (state, action: PayloadAction<{ id: string, data: Omit<Card, 'id'> }>) => {
      return state.map(card => {
        return card.id === action.payload.id
          ? {
            ...card,
            ...action.payload.data
          } : card
      })
    }
  }
})

export const CardsActions = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;

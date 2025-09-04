import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CardData } from "../../domain/card";

const initialState: CardData[] = []

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    mount: (state, action: PayloadAction<CardData[]>) => {
      return action.payload;
    },
    add: (state, action: PayloadAction<CardData>) => {
      return [...state, action.payload]
    },
    delete: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter(({ id }) => action.payload.id !== id)
    },
    update: (state, action: PayloadAction<{ id: string, data: Omit<Partial<CardData>, 'id'> }>) => {
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Coin } from '@/types'

interface WatchlistState {
    coins: Coin[]
}

const initialState: WatchlistState = {
    coins: []
}

export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        addCoin: (state, action: PayloadAction<Coin>) => {
            if (!state.coins.find(coin => coin.id === action.payload.id)) {
                state.coins.push(action.payload)
            }
        },
        removeCoin: (state, action: PayloadAction<string>) => {
            state.coins = state.coins.filter(coin => coin.id !== action.payload)
        },
    },
})

export const isCoinInWatchlist = (state: WatchlistState, coinId: string) => {
    return state.coins.some(coin => coin.id === coinId);
};

export const { addCoin, removeCoin } = watchlistSlice.actions
export default watchlistSlice.reducer

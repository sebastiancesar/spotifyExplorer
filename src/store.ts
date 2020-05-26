import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import rootReducer, { RootState } from './rootReducer'
import { loadSpotifyAccessToken } from 'features/spotify/spotifyActions';


const store = configureStore({
  reducer: rootReducer
})

store.dispatch(loadSpotifyAccessToken());

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export type AppDispatch = typeof store.dispatch

export default store
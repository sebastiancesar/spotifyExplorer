import { combineReducers } from "@reduxjs/toolkit";
import spotifySliceReducer from "features/spotify/spotifySlice";
import playlistsSliceReducer from "features/playlists/playlistsSlice";

const rootReducer = combineReducers({
  spotify: spotifySliceReducer,
  playlists: playlistsSliceReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
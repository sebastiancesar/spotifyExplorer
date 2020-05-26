import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SpotifyStatus = {
  isConnected: boolean;
}

type SpotifyAccess = {
  accessToken: string | null
}

type SpotifyUser = {
  user: SpotifyApi.UserObjectPrivate | null
}

export type SpotifyState = SpotifyAccess & SpotifyStatus & SpotifyUser;

let initialState: SpotifyState = {
  isConnected: false,
  accessToken: null,
  user: null
}

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<SpotifyStatus>) {
      const { isConnected } = action.payload;
      state.isConnected = isConnected;
    },
    setAccess(state, action: PayloadAction<SpotifyAccess>) {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    setUser(state, action: PayloadAction<SpotifyUser>) {
      const { user } = action.payload;
      state.user = user;
    },
    cleanUser(state) {
      state.user = null;
      state.accessToken = null;
      state.isConnected = false;
    }
  }
});

export const { setStatus, setAccess, setUser, cleanUser } = spotifySlice.actions;
export default spotifySlice.reducer;
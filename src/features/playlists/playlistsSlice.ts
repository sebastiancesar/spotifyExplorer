import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SimplePlaylist, SimplePagingObject, PlaylistInfo } from 'modules/playilsts';

export type TracklistDialogState = {
  display: boolean;
  playlistId: string;
  playlist?: SimplePlaylist | null;
}

type BrowsingPlaylist = {
  playlist: SimplePlaylist;
}

export type PlaylistsState = {
  tracklistDialog: TracklistDialogState;
  playlistsInfo: SimplePagingObject<PlaylistInfo> | null;
}

let initialState: PlaylistsState = {
  tracklistDialog: { 
    display: false,
    playlistId: "",
    playlist: null
  },
  playlistsInfo: null
}

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setBrowsingPlaylist(state, action: PayloadAction<BrowsingPlaylist>) {
      const { playlist } = action.payload;
      state.tracklistDialog.playlist = playlist;
    },
    setTracklistDialog(state, action: PayloadAction<TracklistDialogState>) {
      const { display, playlistId } = action.payload;
      state.tracklistDialog = { display, playlistId } ;
    },
    setPlaylistsInfo(state, action: PayloadAction<SimplePagingObject<PlaylistInfo>>) {
      state.playlistsInfo = action.payload;
    },
    cleanPlaylist(state) {
      state.playlistsInfo = null;
    }
  }
});
 

export const { setTracklistDialog, setBrowsingPlaylist,
  setPlaylistsInfo, cleanPlaylist } = playlistsSlice.actions;
export default playlistsSlice.reducer;
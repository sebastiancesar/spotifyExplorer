import { AppThunk } from "store";
import playlistsService from "modules/playlistsService";
import { setBrowsingPlaylist, setPlaylistsInfo } from "features/playlists/playlistsSlice";


export const getSimplePlaylist = (playlistId: string): AppThunk =>
  async (dispatch: Function): Promise<void> => {
    const activePage = "mySpotify";
    const path = activePage + ".dialogs.trackListDialog.open";
    const simplePlaylist = await playlistsService.handleGetSimplePlaylist(
      path,
      playlistId);

    dispatch(setBrowsingPlaylist({ playlist: simplePlaylist }));
}

export const getPlaylistsInfo = (): AppThunk => 
  async (dispatch: Function ): Promise<void> => {
    const activePage = "mySpotify";
    const path = activePage + ".open";
    try {
      const response = await playlistsService.handleGetPlaylistInfo(path);
      dispatch(setPlaylistsInfo(response));
    } catch (err) {
      if (err.code === 401) {
        // do nothing.
      }
    }
}

import { AppThunk } from "store";
import { setStatus, setAccess, setUser } from "./spotifySlice";
import spotifyService from "modules/spotifyService";

export const handleSpotifyResponse = (hashParams: string): AppThunk => 
  (dispatch: Function): void => {
    try {
      const response = spotifyService.buildFromResponse(hashParams);
      dispatch(setStatus({ isConnected: response.connected }));
      dispatch(setAccess({ accessToken: response.accessToken }));
    } catch (err) {
      console.error(err);
    }
}

export const getSpotifyUser = (): AppThunk =>
  async (dispatch: Function): Promise<void> => {
    try {
      const user = await spotifyService.getUser();
      dispatch(setUser({ user }));
    } catch (err) {
      if (err.status === 401) {
        dispatch(setStatus({ isConnected: false }));
      } else {
        throw err;
      }
    }
  }
  
export const loadSpotifyAccessToken = (): AppThunk =>  
  async (dispatch: Function) => {
    console.log("loadSpotifyAccessToken > loading token");
    const response = await spotifyService.loadAccessToken();
    console.log("loadSpotifyAccessToken > token response ", response);
    dispatch(setStatus({ isConnected: response.isConnected }));
  }
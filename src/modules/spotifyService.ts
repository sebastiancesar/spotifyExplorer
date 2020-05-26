import SpotifyWebApi from 'spotify-web-api-js';
import { SpotifyState } from 'features/spotify/spotifySlice';
import { PlaylistInfo, SimplePagingObject, SimpleTrack, SimplePlaylist, PlaylistExplorer } from './playilsts';

class SpotifyError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

const SPOTIFY_CLIENT_ID = "YOUR_CLIENT_ID"; // TAKE THIS VALUE FROM .ENV?

const clientId = "client_id="+ SPOTIFY_CLIENT_ID + "&";
const redirectUrl = "redirect_uri=" + encodeURIComponent("http://localhost:3000/connected/spotify") + "&";
const responseType = "response_type=token";
const authorizeUrl = `https://accounts.spotify.com/authorize?${clientId}${redirectUrl}${responseType}`;

class SpotifyConnection {

  spotfiyAPI = new SpotifyWebApi();

  getConnectionUrl = (): string => {
    return authorizeUrl;
  }

  getUser = async (): Promise<SpotifyApi.UserObjectPrivate> => {
    const user = await this.spotfiyAPI.getMe();
    console.log("spotfiyAPI.getMe ", user);
    return user;
  }

  /** ---------------- LOGIN/TOKEN ------------------ */
  buildFromResponse = (hashParams: string) => {
    const response = this.parseResponse(hashParams);
    this.spotfiyAPI.setAccessToken(response.accessToken);
    localStorage.setItem("spotify-access-token", response.accessToken);

    return response;
  }
  
  parseResponse = (hashParams: string) => {
    console.log("parseResponse > hashParams " , hashParams);
    if (hashParams) {
      const cleanHashParams = hashParams.slice(1); // remove the hashbang
      const params = JSON.parse('{"' + decodeURI(cleanHashParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
      if (params["access_token"]) {
        return { connected: true, accessToken: params["access_token"] }
      } else {
        throw new Error("parseResponse > No access_token")
      }
    } else {
      throw new Error("parseResponse > No valid response from spotify");
    }
  }

  getSpotifyAPI = (accessToken?: string) => {
    if (this.spotfiyAPI.getAccessToken()) {
      return this.spotfiyAPI;
    }

    if (accessToken) {
      this.spotfiyAPI.setAccessToken(accessToken);
      return this.spotfiyAPI;
    } else {
      throw new Error("No access token granted");
    }
  }

  loadAccessToken = async (): Promise<SpotifyState> => {
    const accessToken = localStorage.getItem("spotify-access-token") || null;
    console.log("loadAccessToken - token retrieved from localStorage: ", accessToken);
    const invalidToken = { isConnected: false, accessToken: null, user: null };
    if (!accessToken) { return invalidToken  }
    // check if it still valid
    this.spotfiyAPI.setAccessToken(accessToken);
    try {
      console.log("loadAccessToken - validating the token ");
      const user = await this.getUser();
      return { isConnected: true, accessToken, user }
    } catch (err) {
      if (err.status === 401) {
        // not valid accessToken.
        console.log("loadAccessToken - token not valid anymore");
        localStorage.removeItem("spotify-access-token");
      }
      return invalidToken;
    }
  }
}

class SpotifyService extends SpotifyConnection implements PlaylistExplorer  {
  
  getFullPlaylist = async (spotifyPlaylistId: string) : 
    Promise<SpotifyApi.SinglePlaylistResponse> => {
    const playlist = await this.spotfiyAPI.getPlaylist(spotifyPlaylistId);
    return playlist;
  }

  getTracks = (trackList: SpotifyApi.PagingObject<SpotifyApi.PlaylistTrackObject>): SimplePagingObject<SimpleTrack> => {
    const items = trackList.items.map((trackObject) => {
      return { name: trackObject.track.name }
    });
    const response: SimplePagingObject<SimpleTrack> = {
      ...trackList,
      items
    }
    return response;
  } 
  
  buildPlaylistInfo = (items: SpotifyApi.PlaylistObjectSimplified[]): PlaylistInfo[] => {
    return items.map((playlistObjectSimplified) =>
      ({
        id: playlistObjectSimplified.id,
        name: playlistObjectSimplified.name,
        tracks: playlistObjectSimplified.tracks.total,
        imageUrl: playlistObjectSimplified.images[0].url
      })
    )
  }

  getSimplePlaylist = async (spotifyPlaylistId: string): Promise<SimplePlaylist> => {
    const fullPlaylist = await this.getFullPlaylist(spotifyPlaylistId);
    const simplePlaylist: SimplePlaylist = {
      _id: "spotify-" + fullPlaylist.id,
      sourceId: "spotify-" + fullPlaylist.id,
      name: fullPlaylist.name,
      tracks: this.getTracks(fullPlaylist.tracks),
      imageUrl: fullPlaylist.images[0].url
    }
    return simplePlaylist;
  }

  getPlaylistsInfo = async (): Promise<SimplePagingObject<PlaylistInfo>> => {
    try {
      const response = await this.spotfiyAPI.getUserPlaylists();
      const simplePaging = {
        limit: response.limit,
        next: response.next,
        offset: response.offset,
        previous: response.previous,
        total: response.total,
        items: this.buildPlaylistInfo(response.items)
      }
      return simplePaging;
    } catch (err) {
      if (err.status && err.status === 401) {
        console.log("User not logged in");
        throw new SpotifyError("User not logged in on Spotify", "401");
      }
      return err;
    }
  }
  
}

const spotifyService = new SpotifyService();
export default spotifyService;

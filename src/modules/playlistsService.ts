import spotifyService from "./spotifyService";
import { SimplePagingObject, PlaylistInfo, SimplePlaylist } from "./playilsts";


const queryNavigation: any = {
  // "home.open": recoService.getAllPlaylistsForUser,
  // "home.dialogs.trackListDialog.open": recoService.getSimplePlaylist,
  // "myPlaylists.open": recoService.getPlaylistsInfo,
  // "myPlaylists.dialogs.trackListDialog.open": recoService.getSimplePlaylist,
  "mySpotify.open": spotifyService.getPlaylistsInfo,
  "mySpotify.dialogs.trackListDialog.open": spotifyService.getSimplePlaylist
}

class PlaylistService {

  handleGetPlaylistInfo = async (path: string): Promise<SimplePagingObject<PlaylistInfo>> => {
    const fn = queryNavigation[path];
    const playlists = await fn();
    return playlists;
  }

  handleGetSimplePlaylist = async (path: string, playlistId: string): Promise<SimplePlaylist> => {
    const fn = queryNavigation[path];
    const playlistSimplified = await fn(playlistId);
    return playlistSimplified;
  }

}

const playlistsService = new PlaylistService();

export default playlistsService;
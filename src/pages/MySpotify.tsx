import React from "react";
import { Container } from "@material-ui/core";
import PlaylistsContainer from "components/playlists/PlaylistContainer";
import SpotifyUser from "components/spotify/SpotifyUser";
import { useSelector } from "react-redux";
import { RootState } from "rootReducer";
import { SpotifyState } from "features/spotify/spotifySlice";

const MySpotify = () => {
  const { user } = useSelector<RootState, SpotifyState>((state: RootState) => state.spotify);

  return (
    <>
      <Container maxWidth="sm">
        <h3> My Spotify </h3>
        { user ? <PlaylistsContainer /> : <SpotifyUser /> }
      </Container>
    </>
  );
}

export default MySpotify;

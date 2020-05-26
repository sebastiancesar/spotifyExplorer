import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Playlist from "components/playlists/PlaylistComponent";
import { RootState } from "rootReducer";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { PlaylistsState } from "features/playlists/playlistsSlice";
import { getPlaylistsInfo } from "features/playlists/playlistsActions";

const PlaylistsContainer = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { playlistsInfo } = useSelector<RootState, PlaylistsState>((state: RootState) => state.playlists)
  
  useEffect(() => {
    dispatch(getPlaylistsInfo());
  }, [dispatch]);

  return (
    <>
    <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
        { playlistsInfo?.items && playlistsInfo.items.length > 0 ? 
          playlistsInfo?.items.map((playlist) => (
            <Playlist name={playlist.name}
              key={playlist.name}
              imageUrl={playlist.imageUrl}
              playlistId={playlist.id}
            />
          ))
          : "No playlist"
        }
        </Grid>
    </Container>
    </>
  )
}

export default PlaylistsContainer;

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }
}));
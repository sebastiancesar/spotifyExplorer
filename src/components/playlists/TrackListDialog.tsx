import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogActions, List, ListItem, ListItemText, ListItemIcon, Checkbox, DialogContent } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "rootReducer";
import { setTracklistDialog, TracklistDialogState } from "features/playlists/playlistsSlice";
import ImportPlaylistButton from "components/playlists/ImportButton";
import { SimpleTrack } from "modules/playilsts";
import { getSimplePlaylist } from "features/playlists/playlistsActions";

const TrackListDialog = () => {
  const dispatch = useDispatch(); 
  const { display, playlistId, playlist } = useSelector<RootState, TracklistDialogState>(( state: RootState ) => state.playlists.tracklistDialog );
  const [tracks, setTracks] = useState<Array<SimpleTrack>>();
 
  useEffect(() => {
    if (display) {
      dispatch(getSimplePlaylist(playlistId));
    }
  }, [display, playlistId, dispatch])

  useEffect(() => {
    if (playlist) {
      setTracks(playlist.tracks.items);
    }
  }, [playlist, setTracks]);

  const handleClose = () => {
    dispatch(setTracklistDialog({ display: false, playlistId: "" }));
  }

  return (
    <Dialog 
      open={display}
      fullWidth={true}
      maxWidth="sm"
      scroll="paper"
    >
      <DialogTitle id="simple-dialog-title">Track list</DialogTitle>
      <DialogContent dividers={true}>
        <List>
          { tracks?.map((trackObject) => (
            <ListItem key={trackObject.name}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={true}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={trackObject.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <ImportPlaylistButton playlistId={playlistId} />
        <Button onClick={handleClose} color="secondary"> Close </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TrackListDialog;
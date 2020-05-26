import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setTracklistDialog } from "features/playlists/playlistsSlice";
import ImportPlaylistButton from "components/playlists/ImportButton";

type PlaylistProps = {
  name: string;
  imageUrl: string;
  playlistId: string;
}

const Playlist = (props: PlaylistProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const showTrackListDialog = () => {
    dispatch(setTracklistDialog({ display: true, playlistId: props.playlistId }));
  }

  return(
    <Grid item key={props.name} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={ props.imageUrl }
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="subtitle1" >
            {props.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={ showTrackListDialog }>
            View
          </Button>
          <ImportPlaylistButton playlistId={props.playlistId} />
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Playlist;

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
}));
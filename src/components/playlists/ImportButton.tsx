import React from "react";
import { Button } from "@material-ui/core";

type ImportProps = {
  playlistId: string;
}

const ImportPlaylistButton = (props: ImportProps) => {

  const onImportPlaylist = () => {
    console.log("ImportPlaylistButton importPlaylist ", props.playlistId);
  }

  return (
    <>
      <Button size="small" color="secondary" onClick={onImportPlaylist}>
        Import
      </Button>
    </>
  )
}

export default ImportPlaylistButton;
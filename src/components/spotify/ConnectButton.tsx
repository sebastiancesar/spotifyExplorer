import React from "react";
import { Button } from "@material-ui/core";
import spotifyService from "modules/spotifyService";

const SpotyConnectButton = () => {
  const spoty = () => {
    window.location.href = spotifyService.getConnectionUrl();
  }

  return (
    <div>
      <Button fullWidth variant="outlined" color="primary" onClick={spoty}> Connect spoti </Button>
    </div>
    )
}

export default SpotyConnectButton;
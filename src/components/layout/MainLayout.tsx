import React from "react";
import { CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import MySpotify from "pages/MySpotify";


const MainLayout = () => {

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <h3> Playlists</h3>
        </Toolbar>
      </AppBar>
      <main>
        <MySpotify />
      </main>
    </>
  )
}

export default MainLayout;

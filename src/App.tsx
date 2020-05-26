import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from 'components/layout/MainLayout';
import TrackListDialog from 'components/playlists/TrackListDialog';
import HandleSpotifyConnectionResponse from 'components/spotify/HandleConnection';


function App() {

  return (
    <Router>
      <Switch>
        <Route path="/connected/spotify">
          <HandleSpotifyConnectionResponse />
        </Route>
        <Route path="/">
          <MainLayout />
        </Route>
      </Switch>
      <TrackListDialog />
    </Router>
  );
}

export default App;

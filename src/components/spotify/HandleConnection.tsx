import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import { handleSpotifyResponse } from "features/spotify/spotifyActions";

const HandleSpotifyConnectionResponse = () => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  let location = useLocation();

  useEffect(() => {
    const hashParams = location.hash;
    setRedirect(true);
    dispatch(handleSpotifyResponse(hashParams));
  }, [location, dispatch])

  return (
    <>  
      { redirect ? 
          <Redirect to={{ pathname: '/', state: { from: location } }} /> 
          : <></>
      }
    </>
  )
}

export default HandleSpotifyConnectionResponse;


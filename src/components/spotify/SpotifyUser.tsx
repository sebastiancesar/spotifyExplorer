import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "rootReducer";
import { SvgIcon, Chip } from "@material-ui/core";
import { getSpotifyUser } from "features/spotify/spotifyActions";
import SpotyConnectButton from "./ConnectButton";


const SpotifyUser = () => {
  const { user } = useSelector((state: RootState) => state.spotify);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotifyUser());
  }, [dispatch]);

  const getIcon = () => {
    return (
    <SvgIcon enableBackground="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" > 
      <circle cx="12" cy="12" fill="#4caf50" r="12"/><g fill="#212121"><path d="m16.872 17.656v.001c-.203 0-.329-.063-.518-.174-3.019-1.82-6.532-1.896-10.002-1.185-.189.049-.436.126-.576.126-.47 0-.765-.373-.765-.765 0-.499.295-.736.659-.813 3.963-.875 8.013-.798 11.467 1.268.295.189.47.358.47.798 0 .438-.344.744-.735.744z"/><path d="m18.175 14.483h-.001c-.252 0-.421-.111-.596-.203-3.025-1.79-7.533-2.512-11.545-1.423-.232.063-.358.126-.576.126-.518 0-.938-.421-.938-.938s.252-.861.75-1.001c1.345-.378 2.719-.659 4.732-.659 3.14 0 6.174.779 8.565 2.202.392.232.547.533.547.953-.005.521-.411.943-.938.943z"/><path d="m4.548 6.998c1.703-.499 3.61-.735 5.686-.735 3.532 0 7.234.735 9.939 2.313.378.218.624.518.624 1.093 0 .658-.533 1.127-1.122 1.127l-.001-.001c-.252 0-.407-.063-.625-.189-3.444-2.056-9.605-2.549-13.591-1.436-.175.048-.393.125-.625.125-.639 0-1.127-.499-1.127-1.142 0-.657.407-1.029.842-1.155z"/></g>
    </SvgIcon>)
  }

  const getSpotiButton = () => {
    const username = user?.display_name + "'s playlists";
    return <Chip 
      icon={getIcon()} 
      label={username} />
  }
  return (
    <> { user ? getSpotiButton() : <SpotyConnectButton/> } </>
  );
}

export default SpotifyUser;

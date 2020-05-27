## Spotify Playlist Explorer

This web app was created with create-react-app and using the template for typescript, lets you connect to your spotify account and retrieve your saved playlists.

![screenCapture](https://github.com/sebastiancesar/spotifyExplorer/blob/master/Screen%20Shot%202020-05-27%20at%2013.29.02.png)

It's part of a bigger project that is not finished yet.

You need to create an App in the spotify dashboard in order to get the client-id.

The main idea was explore react hooks and react-redux. More precisely, the library of [redux-toolkit](https://redux-toolkit.js.org/).
I've used the flux approach before with angular, vue and react and I've found that it would be great if some of the boilerplate+decision could be reduced.
I personally think that opinionated libraries are , in some cases, very useful, avoids you the need of reinventing the wheel ... DRY

React router is used to capture the callback of the call to spotify when the permission is requested.

This project only lets you connect to spotify, but it's layered keeping in mind that other sources may be added in the future (like youtube music, etc).

All the components heavy relays on the redux store for communication.

## Flows

The playlists components are not aware if they are displaying spotify playlists or from another source.
They only trigger the requests, and based on the state of the store, the appropriate queries are sent to the back.


## Stack:

* reactJS - hooks
* Typescript
* Material UI
* redux - Reduxt Toolkit
* Spotify API
* localstorage
* router-react-dom









 This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

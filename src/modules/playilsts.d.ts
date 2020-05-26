export type Stored = {
  _id: string;
  type?: string;
}

export interface IStored {
  _id: string;
  type?: string;
}

export interface SimplePagingObject<T> {
  items: T[],
  limit: number,
  next: string,
  offset: number,
  previous: string,
  total: number
}

export type SimpleTrack = {
  name: string
}

type PlaylistMeta = {
  tags: string[];
  location: string;
}

export interface SimplePlaylist extends IStored {
  sourceId: string;
  name: string;
  tracks: SimplePagingObject<SimpleTrack>;
  imageUrl: string;
  userId?:string;
  meta?: PlaylistMeta;
}

export type PlaylistInfo = {
  id: string;
  name: string;
  tracks: number;
  imageUrl: string;
}

export interface PlaylistExplorer {
  getPlaylistsInfo: (user: User) => Promise<SimplePagingObject<PlaylistInfo>>,
  getSimplePlaylist: (playlistId: string) => Promise<SimplePlaylist>
}
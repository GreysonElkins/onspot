
export type SpotifyImage = {
  url: string,
  height: number
  width: number
}

export type SpotifyUser = {
  display_name: string
  external_urls: {
      [key: string]: string
      spotify: string
  }
  href: string
  id: string
  images: SpotifyImage[]
  type: string
  uri: string
  followers: {
    href: string | null
    total: number
  }
  country: string
  product: string
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  },
  email: string
}

export type Artist = {
  external_urls: {
      [key: string]: any
      spotify: string
  },
  href: string,
  id: string,
  name: string,
  type: string,
  uri: string
}

export type Track = {
  added_at: string
  track: {
    album: {
      album_type: string
      artists: Artist[]
      available_markets: string[]
      external_urls: {
        [key:string]: any
        spotify: string
      }
      href: string
      id: string
      images: SpotifyImage[]
      name: string
      release_date: string
      release_date_precision: string
      total_tracks: number
      type: string
      uri: string
    }
    artists: Artist[]
    available_markets: string[]
    disc_number: number
    duration: number
    explicit: boolean
    external_ids: {
      [key: string]: any
    }
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
  }
}

type PaginatedResponse<T> = {
  href: string
  items: T[]
  limit: number
  next: string | null
  offset: 0
  previous: string | null
  total: number
}

export type TrackResponse = PaginatedResponse<Track> 

export type Playlist = {
  collaborative: boolean
  description: string
  external_urls: {
    [key: string]: string
    spotify: string
  },
  href: string
  id: string
  images: SpotifyImage[],
  name: string
  owner: {
    external_urls: {
      [key: string]: string
      spotify: string
    },
    followers: {
      href: string
      total: number
    },
    href: string
    id: string
    type: string,
    uri: string
    display_name: string
  },
  public: boolean,
  snapshot_id: string
  tracks: {
    href: string
    total: number
  },
  type: string
  uri: string
}

export type PlaylistResponse = PaginatedResponse<Playlist>

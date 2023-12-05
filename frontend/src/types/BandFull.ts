export interface BandFull {
  id: number, // ?
  bandId: string, // /band/ac-dc
  img: string,
  name: string,
  
  year: number,
  genresNames: string[],

  history: BandHistory[],
  members: BandMember[],
  genres: BandGenre[], // genre: 'classic-rock' - link
  tracks: BandTrack[],
};

export type BandHistory = {
  title: string,
  description: string[]
};

export type BandMember = {
  member: string,
  img?: string,
  description: string[]
};

export type BandGenre = {
  genre: string,
  songs: string[]
};

export type BandTrack = {
  id: string,
  name: string,
  link: string
};

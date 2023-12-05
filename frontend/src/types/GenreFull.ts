export interface GenreFull {
  id: number,
  // genreId: string,
  name: string,
  img: string,

  year: number,
  quantityBands: number,
  heavines: string,

  info: GenreInfo[],
  bands: GenreBands[],
  examples: GenreSongs[],
};

export type GenreInfo = {
  title: string, // History, Heaviness, 
  text: string[],
};

export type GenreBands = {
  name: string, // Ac/Dc 
  songs: string[],
};

export type GenreSongs = {
  id: string,
  name: string,
  link: string,
};

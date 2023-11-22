type GenreInfo = {
  title: string, // History, Heaviness, 
  text: string[],
};

type GenreBands = {
  name: string, // Ac/Dc 
  songs: string[],
};

type GenreSongs = {
  id: string,
  name: string,
  link: string,
};

export type GenreFull = {
  id: number,
  genreId: string,
  name: string,
  img: string,

  info: GenreInfo[],
  bands: GenreBands[],
  examples: GenreSongs[],
};

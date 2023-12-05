// /* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/Status';
import { GenreShort } from '../../types/GenreShort';
import { getGenres } from '../../api/genreApi';
import { GenersRequest } from '../../types/GenersRequest';

export interface GenresState {
  genres: GenreShort[] | null;
  status: Status;
}

const initialState: GenresState = {
  genres: null,
  status: Status.Inaction,
};

export const getFirstPageOfGenresAsyncBy = createAsyncThunk(
  'user/getGeners',
  async (data: Omit<GenersRequest, 'page'>) => {
    return await getGenres({page: 1, ...data});
  },
);


export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<GenreShort[]>) => {
      state.genres = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFirstPageOfGenresAsyncBy.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getFirstPageOfGenresAsyncBy.fulfilled, (state, action) => {
        state.status = Status.Inaction;
        state.genres = action.payload;
      })
      .addCase(getFirstPageOfGenresAsyncBy.rejected, (state) => {
        state.status = Status.Failed;
      })
  },
});

export const { setGenres } = genresSlice.actions;
export default genresSlice.reducer;

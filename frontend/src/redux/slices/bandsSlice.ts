// /* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/Status';
import { BandShort } from '../../types/BandShort';
import { BandsRequest } from '../../types/BandsRequest';
import { getBands } from '../../api/bandsApi';

export interface BandsState {
  bands: BandShort[] | null;
  status: Status;
}

const initialState: BandsState = {
  bands: null,
  status: Status.Inaction,
};

export const getFirstPageOfBandsAsyncBy = createAsyncThunk(
  'user/getBands',
  async (data: Omit<BandsRequest, 'page'>) => {
    return await getBands({page: 1, ...data});
  },
);


export const bandsSlice = createSlice({
  name: 'bands',
  initialState,
  reducers: {
    setBands: (state, action: PayloadAction<BandShort[]>) => {
      state.bands = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFirstPageOfBandsAsyncBy.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getFirstPageOfBandsAsyncBy.fulfilled, (state, action) => {
        state.status = Status.Inaction;
        state.bands = action.payload;
      })
      .addCase(getFirstPageOfBandsAsyncBy.rejected, (state) => {
        state.status = Status.Failed;
      })
  },
});

export const { setBands } = bandsSlice.actions;
export default bandsSlice.reducer;

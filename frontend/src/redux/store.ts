import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import genresSlice from './slices/genresSlice';
import bandsSlice from './slices/bandsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    genres: genresSlice,
    bands: bandsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */

// /* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, loginUser, registerUser } from '../../types/User';
// import { getUser } from '../../api/_____userApi';
import { Status } from '../../types/Status';
import { SignUrls, signBy } from '../../api/loginApi';

export interface UserState {
  user: User | null;
  // error: string | null,
  status: Status;
}

const initialState: UserState = {
  user: null,
  // error: null,
  status: Status.Inaction,
};

export const getLoginUserAsyncBy = createAsyncThunk(
  'user/getLoginUser',
  async (data: loginUser) => {
    return await signBy(SignUrls.Login, data);
  },
);

export const getRegistUserAsyncBy = createAsyncThunk(
  'user/getRegistUser',
  async (data: registerUser) => {
    return await signBy(SignUrls.Regist, data);
  },
);

// export const getUserAsyncBy = createAsyncThunk(
//   'user/getUser',
//   async (userId: number) => {
//     const user = await getUser(userId);

//     return user;
//   },
// );

// export const addUserAsyncBy = createAsyncThunk(
//   'user/addUser',
//   async (data: registerUser) => {
//     const user = await postUser(data);

//     return user;
//   },
// );

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginUserAsyncBy.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getLoginUserAsyncBy.fulfilled, (state, action) => {
        state.status = Status.Inaction;
        state.user = action.payload;
      })
      .addCase(getLoginUserAsyncBy.rejected, (state) => {
        state.status = Status.Failed;
      })
      .addCase(getRegistUserAsyncBy.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getRegistUserAsyncBy.fulfilled, (state, action) => {
        state.status = Status.Inaction;
        state.user = action.payload;
      })
      .addCase(getRegistUserAsyncBy.rejected, (state) => {
        state.status = Status.Failed;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

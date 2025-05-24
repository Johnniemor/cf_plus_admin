import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types/user';

export interface IUserState {
  me: IUser | null;
}

const initialState: IUserState = {
  me: null,
};

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const user = createAppSlice({
  name: 'user',
  initialState,
  reducers: (create) => ({
    setUser: create.reducer((state, action: PayloadAction<IUser | null>) => {
      state.me = action.payload;
    }),
    clearUser: create.reducer((state) => {
      state.me = null;
    }),
  }),
  selectors: {
    me: (state) => state.me as IUser,
  },
});

export const { setUser, clearUser } = user.actions;
export const { me } = user.selectors;

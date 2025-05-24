import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IMain {
  mainLoading: boolean;
  theme: 'light' | 'dark';
}

const initialState: IMain = {
  mainLoading: true,
  theme: 'light',
};

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const main = createAppSlice({
  name: 'main',
  initialState,
  reducers: (create) => ({
    setMainLoading: create.reducer((state, action: PayloadAction<boolean>) => {
      state.mainLoading = action.payload;
    }),
    setTheme: create.reducer((state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    }),
  }),
  selectors: {
    mainLoading: (state) => state.mainLoading,
    theme: (state) => state.theme,
  },
});

export const { setMainLoading, setTheme } = main.actions;
export const { mainLoading, theme } = main.selectors;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

type IInitialState = {
  error: boolean;
  loading: boolean;
  url: string | undefined;
};

export const audioSlice = createSlice({
  name: 'audioSlice',
  initialState: {
    error: false,
    url: undefined,
    loading: false,
  } as IInitialState,
  reducers: {
    checkUrl: (state, action: PayloadAction<string>) => {
      const regExp = /^(?!http:)[^:]+:\/\/.+$/;
      state.error = !regExp.test(action.payload);
    },
    setUrl: (state, action: PayloadAction<string>) => {
      if (!state.error) {
        state.url = action.payload;
      }
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
});

export const searchError = (state: RootState) => state.audio.error;
export const searchUrl = (state: RootState) => state.audio.url;
export const { checkUrl, setUrl, setError } = audioSlice.actions;
export default audioSlice.reducer;

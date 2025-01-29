import {appTheme, storageKeys} from '@src/const/enums';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import storage from '@src/utils/storage';

interface AppConfigState {
  externalURL: string | null;
  externalApiKey: string | null;
  appTheme: appTheme;
  appLanguage: string;
  avatars: string[];
  internalUrl: string | null;
}

const initialState: AppConfigState = {
  externalURL: null,
  externalApiKey: '',
  appTheme: appTheme.Dark,
  appLanguage: 'en',
  avatars: [],
  internalUrl: null,
};

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setExternalURL: (state, action: PayloadAction<string>) => {
      state.externalURL = action.payload;
    },
    setExternalApiKey: (state, action: PayloadAction<string>) => {
      state.externalApiKey = action.payload;
    },
    setAppTheme: (state, action: PayloadAction<appTheme>) => {
      state.appTheme = action.payload;
      storage.setItem(storageKeys.appTheme, action.payload);
    },
    setAppLanguage: (state, action: PayloadAction<string>) => {
      state.appLanguage = action.payload;
    },
    setAvatars: (state, action: PayloadAction<string[]>) => {
      state.avatars = action.payload;
    },
    setInternalUrl: (state, action: PayloadAction<string>) => {
      state.internalUrl = action.payload;
    },
  },
});

export const {
  setExternalURL,
  setAppTheme,
  setExternalApiKey,
  setAppLanguage,
  setAvatars,
  setInternalUrl,
} = appConfigSlice.actions;

export default appConfigSlice.reducer;

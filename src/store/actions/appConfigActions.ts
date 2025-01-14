import {appTheme, storageKeys} from '@src/const/enums';
import i18n from '@src/localization/index';
import {getConfigListService} from '@src/service/internalServices';
import {
  setAppLanguage,
  setAppTheme,
  setAvatars,
  setExternalApiKey,
  setExternalURL,
} from '@src/store/slices/appConfigSlice';
import {store} from '@src/store/store';
import storage from '@src/utils/storage';
import * as RNLocalize from 'react-native-localize';

export const loadTheme = async () => {
  const appTheme = (await storage.getItem(storageKeys.appTheme)) as appTheme;
  if (appTheme) {
    setAppThemeAction(appTheme);
  }
};

export const loadLanguage = async () => {
  const dispatch = store.dispatch;
  const appLanguage = (await storage.getItem(
    storageKeys.appLanguage,
  )) as string;

  let language = 'en';

  if (appLanguage) {
    language = appLanguage;
  } else {
    const deviceLanguages = RNLocalize.getLocales();
    language = deviceLanguages[0]?.languageCode || 'en';
  }

  i18n.locale = language;
  dispatch(setAppLanguage(language));
};

export const toggleTheme = () => {
  const currentTheme = store.getState().appConfig.appTheme;
  const newTheme =
    currentTheme === appTheme.Dark ? appTheme.Light : appTheme.Dark;
  setAppThemeAction(newTheme);
};

export const setAppThemeAction = (theme: appTheme) => {
  const dispatch = store.dispatch;
  dispatch(setAppTheme(theme));
};

export const setAppLanguageAction = async (language: string) => {
  await storage.setItem(storageKeys.appLanguage, language);
};

export const loadAppConfig = async () => {
  const dispatch = store.dispatch;
  const res = await getConfigListService();
  const externalUrl = res.find((item: any) => item.key === 'imdb_url')?.value;
  const externalApiKey = res.find(
    (item: any) => item.key === 'imdb_key',
  )?.value;
  const avatars = res.find((item: any) => item.key === 'avatars')?.value;

  dispatch(setAvatars(avatars));
  dispatch(setExternalURL(externalUrl));
  dispatch(setExternalApiKey(externalApiKey));
};

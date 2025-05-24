import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineSlices } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { user } from '@/redux/reducer/user';
import { main } from '@/redux/reducer/main';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type { PersistPartial } from 'redux-persist/es/persistReducer';

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(user, main);

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer> & PersistPartial;

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: any) => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
    preloadedState,
  });

  setupListeners(store.dispatch);
  return store;
};

const store = makeStore();

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action<string>>;

export const persistor = persistStore(store);

export default store;

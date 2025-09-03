import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/api/authApi';
import { socialMediaApi } from './features/api/socialMediaApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [socialMediaApi.reducerPath]: socialMediaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, socialMediaApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
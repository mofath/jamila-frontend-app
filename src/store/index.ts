// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { firebaseApi } from '../apis/firebaseApi';

export const store = configureStore({
  reducer: {
    [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firebaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

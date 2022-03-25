import { configureStore } from "@reduxjs/toolkit";
import { utilizadorAPI } from './services/utilizadorAPI';

export const store = configureStore({

  reducer: {
    [utilizadorAPI.reducerPath]: utilizadorAPI.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(utilizadorAPI.middleware),
});
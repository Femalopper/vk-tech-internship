import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice.js';

export default configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
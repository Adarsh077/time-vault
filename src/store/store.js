import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import currentSessionSlice from './current-session/current-session.slice';
import recordSlice from './records/records.slice';
import taskSlice from './task/task.slice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  recordReducer: recordSlice,
  currentSessionReducer: currentSessionSlice,
  taskReducer: taskSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export const persistor = persistStore(store);

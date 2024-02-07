import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contactsSlice';
import { authReducer } from './auth/authSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const contactsConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
  // blacklist: ['filter'],
};

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    contacts: persistReducer(contactsConfig, contactsReducer),
    auth: persistReducer(authConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // ignoredActions: [],
      },
    }),
});

// export const store = configureStore({
//   reducer: {
//     contacts: contactsReducer,
//     auth: authReducer,
//   },
// });

export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

// import { configureStore } from '@reduxjs/toolkit';
// // import { contactsReducer } from './contacts/contactsSlice';

// // import {
// //   persistStore,
// //   persistReducer,
// //   FLUSH,
// //   REHYDRATE,
// //   PAUSE,
// //   PERSIST,
// //   PURGE,
// //   REGISTER,
// // } from 'redux-persist';
// // import storage from 'redux-persist/lib/storage';

// // import { modalReducer } from './modal/modalSlice';

// // export const store = configureStore({
// //     reducer: {
// //       contacts: contactsReducer,
// //     },
// //   });

// const contactsConfig = {
//   key: 'contacts',
//   // storage,
//   whitelist: ['contacts'],
//   // blacklist: ['filter'],
// };

// export const store = configureStore({
//   reducer: {
//     // contacts:  persistReducer(contactsConfig, contactsReducer),
//     // modal: modalReducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         ignoredActions: [],
//       },
//     }),
// });

// // export const persistor = persistStore(store);

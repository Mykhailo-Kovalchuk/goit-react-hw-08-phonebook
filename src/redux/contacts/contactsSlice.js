import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { STATUSES } from '../../utils/constants';
import * as apiContacts from '../../services/api'


export const apiGetContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const contacts = await apiContacts.fetchContacts();
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
  

export const apiAddContact = createAsyncThunk(
  'contacts/apiAddContact',
  async (contact, thunkApi) => {
    try {
      const newContact = await apiContacts.addContact(contact);
      return newContact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
  
export const apiDeleteContact = createAsyncThunk(
  'contacts/apiDeleteContact',
  async (id, thunkApi) => {
    try {
      const contacts = await apiContacts.deleteContact(id);
      // console.log(id);
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);




const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null
  },
  filter: ""
}

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів

  reducers: {
  //   addContact(state, action) {
  //     // state.friends = [...state.friends, action.payload];
  //     state.contacts.push(action.payload);
  //   },
  //   removeContact(state, action) {
  //     // const friendIndex = state.friends.findIndex(
  //     //   el => el.id === action.payload
  //     // );

  //     // state.friends.splice(friendIndex, 1);

  //     state.contacts = state.contacts.filter(
  //       contact => contact.id !== action.payload
  //     );
  //   },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(apiGetContacts.pending, (state, _) => {
        state.contacts.status = STATUSES.pending;
        state.contacts.error = null;
      })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.contacts.status = STATUSES.success;
        state.contacts.items = action.payload;
      })
      .addCase(apiGetContacts.rejected, (state, action) => {
        state.contacts.status = STATUSES.error;
        state.contacts.error = action.payload;
      })
      .addCase(apiAddContact.pending, (state, _) => {
        state.contacts.status = STATUSES.pending;
        state.contacts.error = null;
      })
      .addCase(apiAddContact.fulfilled, (state, action) => {
        state.contacts.status = STATUSES.success;
        state.contacts.items.push(action.payload);
      })
      .addCase(apiAddContact.rejected, (state, action) => {
        state.contacts.status = STATUSES.error;
        state.contacts.error = action.payload;
      })
      .addCase(apiDeleteContact.pending, (state, _) => {
        state.contacts.status = STATUSES.pending;
        state.contacts.error = null;
      })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        // console.log(action);
        state.contacts.status = STATUSES.success;
        state.contacts.items = state.contacts.items.filter(contact => {
          // console.log(action.payload);
          return contact.id !== action.payload;
        });
        // console.log(action.payload);
      })
      .addCase(apiDeleteContact.rejected, (state, action) => {
        state.contacts.status = STATUSES.error;
        state.contacts.error = action.payload;
      });
  },
});


// // Генератори екшенів
// export const { addContact, setFilter, removeContact } = contactsSlice.actions;
export const { setFilter } = contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;

































// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   contacts: [],
//   filter: '',
// };

// const contactsSlice = createSlice({
//   // Ім'я слайсу
//   name: 'contacts',
//   // Початковий стан редюсера слайсу
//   initialState,
//   // Об'єкт редюсерів
//   reducers: {
//     addContact(state, action) {
//       // state.friends = [...state.friends, action.payload];
//       state.contacts.push(action.payload);
//     },
//     removeContact(state, action) {
//       // const friendIndex = state.friends.findIndex(
//       //   el => el.id === action.payload
//       // );

//       // state.friends.splice(friendIndex, 1);

//       state.contacts = state.contacts.filter(
//         contact => contact.id !== action.payload
//       );
//     },
//     setFilter(state, action) {
//       state.filter = action.payload;
//     },
//   },
// });

// // Генератори екшенів
// export const { addContact, setFilter, removeContact } = contactsSlice.actions;
// // Редюсер слайсу
// export const contactsReducer = contactsSlice.reducer;



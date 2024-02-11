import { createSlice, createAsyncThunk, isAnyOf} from '@reduxjs/toolkit';
// import { STATUSES } from '../../utils/constants';
// import * as apiContacts from '../../services/api'
import { $authInstance } from '../../redux/auth/authSlice';


// Операції
// 1) Операція отримання контактів
export const apiGetContacts = createAsyncThunk(
  'contacts/apiGetContacts',
  async (_, thunkApi) => {
    try {
      const contacts = await $authInstance.get('/contacts');
      console.log(contacts.data);
      return contacts.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
  
// 2) Операція додавання контактів
export const apiAddContact = createAsyncThunk(
  'contacts/apiAddContact',
  async (formData, thunkApi) => {
    try {
      const { data } = await $authInstance.post('/contacts', formData);
console.log(data)

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
  
// 3) Операція видалення контактів
export const apiDeleteContact = createAsyncThunk(
  'contacts/apiDeleteContact',
  async (contactId, thunkApi) => {
    try {
      const contacts = await $authInstance.delete(`/contacts/${contactId}`);

      console.log(contactId);
      console.log(contacts);
      return contacts.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


const initialState = {
  contacts: null,
  isLoading: false,
  error: null


  //Попередній стан
  // contacts: {
  //   items: [],
  //   isLoading: false,
  //   error: null
  // },
  // filter: ""
}

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів

  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      // .addCase(apiGetContacts.pending, (state, _) => { ------- Для пендінгу теж використовуємо addMatcher - це значно зменшує код. 
      // Фактично все закоментоване можна видалити, але залишаю, як пояснення
      //   state.contacts.status = STATUSES.pending;
      //   state.contacts.error = null;
      // })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      // .addCase(apiGetContacts.rejected, (state, action) => {  ------ дивитись нижче, замість повторюваних кейсів ми використали 
      // addMatcher і фактично об`єднали їх  і скоротили код ---- ТАК РОБЛЮ ДЛЯ API ОТРИМАННЯ, ВИДАЛЕННЯ ТА ДОДАВАННЯ
        // state.contacts.status = STATUSES.error;
        // state.contacts.error = action.payload;
      // })
      // .addCase(apiAddContact.pending, (state, _) => {
      //   state.contacts.status = STATUSES.pending;
      //   state.contacts.error = null;
      // })
      .addCase(apiAddContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts =  [...state.contacts, action.payload];
      })
      // .addCase(apiAddContact.rejected, (state, action) => { ------ дивитись нижче, замість повторюваних кейсів ми використали 
      // addMatcher і фактично об`єднали їх  і скоротили код

        // state.contacts.status = STATUSES.error;
        // state.contacts.error = action.payload;
      // })
      // .addCase(apiDeleteContact.pending, (state, _) => {
      //   state.contacts.status = STATUSES.pending;
      //   state.contacts.error = null;
      // })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.contacts = state.contacts.filter(contact => {
          // console.log(action.payload);
          return contact.id !== action.payload.id;
        });
        // console.log(action.payload);
      })
      // .addCase(apiDeleteContact.rejected, (state, action) => { ------ дивитись нижче, замість повторюваних кейсів ми використали 
      // addMatcher і фактично об`єднали їх  і скоротили код

        // state.contacts.status = STATUSES.error;
        // state.contacts.error = action.payload;
      // })
    .addMatcher(isAnyOf(   // де логіка дублюється можна використовувати addMatcher, набагато зручніше працювати з кодом і візуально теж краще сприймається.
      apiGetContacts.rejected,
      apiAddContact.rejected,
      apiDeleteContact.rejected
    ), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    })
    .addMatcher(isAnyOf( 
        apiGetContacts.pending,
        apiAddContact.pending,
        apiDeleteContact.pending
      ), (state) => {
          state.isLoading = true;
          state.error = null;
        });
  },
});


// // Генератори екшенів
// export const { addContact, setFilter, removeContact } = contactsSlice.actions;
export const { setFilter } = contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;





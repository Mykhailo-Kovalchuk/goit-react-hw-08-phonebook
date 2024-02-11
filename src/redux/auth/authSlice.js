import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
// import { STATUSES } from "../../utils/constants";
// import { fetchContacts2 } from "../../services/api";
import Notiflix from 'notiflix';

export const $authInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

// функція створення токену (точніше його отримання та запису)
const setToken = token => {
  $authInstance.defaults.headers.common.Authorization = `Bearer ${token}`; // Саме так витягуємо токет з хедерів запиту, для авторизації.
};
// функція видалення токену
const clearToken = () => {
  // нічого не приймає
  $authInstance.defaults.headers.common.Authorization = ''; // просто замість токену в хедері запиту, записуємо порожній рядок, тобто очищуємо.
};

// створюємо операції
// 1) запит на сервер - санка на реєстрацію.
export const apiRegisterUser = createAsyncThunk(
  'auth/apiRegisterUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await $authInstance.post('/users/signup', formData);

      // повинен повернутись об`єкт { user: {name: 'wewewe', email: 'wewewe@gmail.com'}, token: 'weq2132edwe12e21' }
      console.log(data);

      // Найголовніше -  тепер треба зберегти відповідь від бекенду про нового зареєстрованого користувача. -
      // для цього використовуємо функцію setToken() яку ми створили раніше
      setToken(data.token);
      Notiflix.Notify.success('Your regestration has been success!');
      return data;
    } catch (error) {
      Notiflix.Notify.failure('Your regestration has been failed!');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// 2) запит на сервер - санка на логін.
export const apiLoginUser = createAsyncThunk(
  'auth/apiLoginUser',
  async (formData, thunkApi) => {
    try {
      const { data } = await $authInstance.post('/users/login', formData);

      // повинен повернутись об`єкт { email: 'wewewe@gmail.com, password: 'ssdwqeqe213' }
      console.log(data);

      // треба зберегти відповідь від бекенду про нового зареєстрованого користувача. - для цього використовуємо функцію setToken()
      // у цьому випадку треба зберегти токен, щоб розпізнити зареєстрованого користувача
      setToken(data.token);
      Notiflix.Notify.success(`Welcome ${data.user.name}`);
      return data;
    } catch (error) {
      Notiflix.Notify.failure('Wrong  userlogin or password');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// 3) Операція logout користувача
export const apiLogoutUser = createAsyncThunk(
  'auth/apiLogoutUser',
  async (_, thunkApi) => {
    try {
      await $authInstance.post('/users/logout');
      // при логауті ніяких даних не отримуємо, а лише викликаємо функцію.
      // так само і не будемо встановлювати токен, а навпаки видаляти
      Notiflix.Notify.success('Bye! See you later!');
      // Найголовніше -  тепер треба зберегти відповідь від бекенду про нового зареєстрованого користувача. -
      // для цього використовуємо функцію setToken() яку ми створили раніше
      clearToken();
      return;
    } catch (error) {
      Notiflix.Notify.failure('Logout unsuccess!');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// 4) Операція оновлення сторінки
export const apiRefreshUser = createAsyncThunk(
  'auth/apiRefreshUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    console.log(state);
    const token = state.auth.token;

    if (!token) return thunkApi.rejectWithValue("You don't have a token!");

    try {
      setToken(token);

      const { data } = await $authInstance.get('/users/current');

      // повинен повернутись об`єкт { email: 'wewewe@gmail.com, password: 'ssdwqeqe213' }
      console.log(data);

      // треба зберегти відповідь від бекенду про нового зареєстрованого користувача. - для цього використовуємо функцію setToken()
      // у цьому випадку треба зберегти токен, щоб розпізнити зареєстрованого користувача
      // setToken(data.token);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: null,
  userData: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,

  // userData: {
  //     name: null,
  //     email: null,
  //     password: null,
  // },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(apiRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(apiLoginUser.fulfilled, (state, action) => {
        // фулфілд не робимо разом через addMatcher бо це 2 окремі операції реєстрації та логування, тож не варто їх поєднувати (хоча код ідентичний)
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
        // fetchContacts2();
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload;
      })
      .addCase(apiLogoutUser.fulfilled, () => {
        // при успішному логауті повертаємо початковий стан. Або переписуючи кожне поле як нижче
        // state.isLoading = false;
        // state.isLoggedIn = false;
        // state.userData =  null;
        // або ж просто повернувши початковий стан
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          apiLoginUser.pending,
          apiRegisterUser.pending,
          apiRefreshUser.pending,
          apiLogoutUser.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          apiLoginUser.rejected,
          apiRegisterUser.rejected,
          apiRefreshUser.rejected,
          apiLogoutUser.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const authReducer = authSlice.reducer;

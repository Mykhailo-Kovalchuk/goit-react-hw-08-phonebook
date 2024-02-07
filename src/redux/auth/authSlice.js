import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { STATUSES } from "../../utils/constants";

export const $authInstance = axios.create({
    baseURL: 'https://connections-api.herokuapp.com'
})

 const setToken = token => {
    $authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;    // Саме так витягуємо токет з хедерів запиту, для авторизації.
 }

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

    return data;
} catch (error) {
    thunkApi.rejectWithValue(error.message)
}
})

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
    
        return data;
    } catch (error) {
        thunkApi.rejectWithValue(error.message)
    }
    })




const initialState = {
    token: null,
    isLoggedIn: false,
    error: null,
    isLoading: false,
    userData: null
    // userData: {
    //     name: null,
    //     email: null,
    //     password: null,
    // },
}


export const authSlice = createSlice({
name: 'auth',
initialState,
extraReducers: (builder) => builder.addCase(apiRegisterUser.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isLoggedIn = true;
    state.userData = action.payload.user;
    state.token = action.payload.token;
})
.addCase(apiLoginUser.fulfilled, (state, action) => {   // фулфілд не робимо разом через addMatcher бо це 2 окремі операції реєстрації та логування, тож не варто їх поєднувати (хоча код ідентичний)
    state.isLoading = false;
    state.isLoggedIn = true;
    state.userData = action.payload.user;
    state.token = action.payload.token; 
})
.addMatcher((apiLoginUser.pending, apiRegisterUser.pending), (state, action) => { 
state.isLoading = true;
state.error = null;
})
.addMatcher((apiLoginUser.rejected, apiRegisterUser.rejected), (state, action) => { 
    state.isLoading = false;
    state.error = action.payload;
    })
});


export const authReducer = authSlice.reducer;
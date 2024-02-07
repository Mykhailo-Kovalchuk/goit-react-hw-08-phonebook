// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://65bdea4bdcfcce42a6f19518.mockapi.io/api',
// });

// // функція отримання даних (контактів) з бекенду
// export const fetchContacts = async () => {
//   const contactsResp = await instance.get('/contacts');
// //   console.log(contactsResp.data);
//   return contactsResp.data;
// };

// // функція передачі (створення) даних  (контактів) до бекенду
// export const addContact = async contact => {
//   const response = await instance.post('/contacts', contact);
//   return response.data;
// };

// // функція видалення даних  (контактів) з бекенду
// export const deleteContact = async contactId => {
//   await instance.delete(`/contacts/${contactId}`);
//   return contactId;
// };









// // import axios from 'axios';

// // const instance = axios.create({
// //   baseURL: 'https://connections-api.herokuapp.com',
// // });

// // // функція отримання даних (контактів) з бекенду
// // export const fetchContacts = async () => {
// //   const contactsResp = await instance.get('/contacts');
// //   console.log(contactsResp);
// //   return contactsResp.data;
// // };

// // // функція передачі (створення) даних  (контактів) до бекенду
// // export const addContact = async contact => {
// //   const response = await instance.post('/contacts', contact);
// //   return response.data;
// // };

// // // функція видалення даних  (контактів) з бекенду
// // export const deleteContact = async contactId => {
// //   await instance.delete(`/contacts/${contactId}`);
// //   return contactId;
// // };


// const instance2 = axios.create({
//   baseURL: 'https://connections-api.herokuapp.com',
// });

// // функція отримання даних (контактів) з бекенду
// export const fetchContacts2 = async () => {

// try {
//   const contactsResp = await instance2.get('/contacts');
//   console.log(contactsResp);
//   return contactsResp.data;
// } catch (error) {
//   console.log(error)
// }

// };



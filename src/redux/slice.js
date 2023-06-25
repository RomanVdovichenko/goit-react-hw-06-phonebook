import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  storage,
}

const contactSlice = createSlice({
  name: 'contact',
  initialState: {cont: []},
  reducers: {
    addContact(state, action) { 
      return {cont: [...state.cont, action.payload]}
    },
    deleteContact(state, action) {
      return {cont: state.cont.filter(item => item.id !== action.payload)}
    }
  }
})

export const persistedReducer = persistReducer(persistConfig, contactSlice.reducer);

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    chengeFilter(state, action) {
      return state = action.payload
    }
  }
})

export const { addContact, deleteContact } = contactSlice.actions;
export const { chengeFilter } = filterSlice.actions;

export const getContacts = state => state.contacts.cont;
export const getFilter = state => state.filter;
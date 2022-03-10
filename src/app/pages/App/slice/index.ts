import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { GlobalState } from './types';
import { useInjectReducer } from 'redux-injectors';

export const initialState: GlobalState = {
  users: { user1: [], user2: [], user3: [] },
  error: null,
  currentUser: 'user1',
  loading: false,
};

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    // dag 실행
    setUserData: (state, action) => {
      const { elements, prevUser } = action.payload;
      state.users[prevUser] = elements;
    },

    changeUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { actions, reducer } = slice;

export const useGlobalSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

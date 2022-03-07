import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { MultiSelectState, IColumnAttribute } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { MultiSelectSaga } from './saga';

export const initialState: MultiSelectState = {
  columnAttributes: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'multiSelect',
  initialState,
  reducers: {
    fetchColAttrsRequest: (
      state,
      _action: PayloadAction<{ datasetId: string }>,
    ) => {
      state.loading = true;
    },
    fetchColAtrrsSuccess: (
      state,
      action: PayloadAction<{ columnAttributes: IColumnAttribute[] }>,
    ) => {
      state.loading = false;
      state.columnAttributes = action.payload.columnAttributes;
    },
    fetchColAttrsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetColAttrs: state => {
      state.columnAttributes = null;
    },
  },
});

export const { actions, reducer } = slice;

export const useMultiSeclectSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: MultiSelectSaga });
  return { actions: slice.actions };
};

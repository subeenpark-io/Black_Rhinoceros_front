import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DatapageState } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { DatapageSaga } from './saga';

export const initialState: DatapageState = {
  elements: [],
  resultId: null,
  loading: false,
  error: null,
  parameterForm: null,
};

const slice = createSlice({
  name: 'datapage',
  initialState,
  reducers: {
    tyrRunDagRequest: (state, _action) => {
      state.loading = true;
    },
    tryRunDagSuccess: (state, action) => {
      state.loading = false;
      state.resultId = action.payload.result_id;
    },
    tryRunDagFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchParamFormRequest: state => {
      state.loading = true;
    },
    fetchParamFormSuccess: (state, action) => {
      state.loading = false;
      state.parameterForm = action.payload;
    },
    fetchParamFormFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions, reducer } = slice;

export const useDatapageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: DatapageSaga });
  return { actions: slice.actions };
};

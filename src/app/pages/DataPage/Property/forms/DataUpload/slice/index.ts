import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DataUploadState } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { DataUploadSaga } from './saga';

export const initialState: DataUploadState = {
  datasetId: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'dataUpload',
  initialState,
  reducers: {
    postDatasetRequest: (state, _action: PayloadAction<FormData>) => {
      state.loading = true;
    },
    postDatasetSuccess: (state, action: PayloadAction<{ _id: string }>) => {
      state.loading = false;
      state.datasetId = action.payload._id;
    },
    postDatasetFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions, reducer } = slice;

export const useDataUploadSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: DataUploadSaga });
  return { actions: slice.actions };
};

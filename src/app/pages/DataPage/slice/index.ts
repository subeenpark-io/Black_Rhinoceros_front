import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DatapageState } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { DatapageSaga } from './saga';
import { IColumnAttribute } from './types';

export const initialState: DatapageState = {
  elements: [],
  resultId: null,
  loading: false,
  error: null,
  parameterForm: null,
  datasetId: null,
  columnAttributes: null,
};

const slice = createSlice({
  name: 'datapage',
  initialState,
  reducers: {
    // dag 실행
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

    // 파라미터 양식 fetch
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

    // 데이터 업로드
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
    resetDatasetId: state => {
      state.datasetId = null;
    },

    // multi select 컬럼 fetch
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

export const useDatapageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: DatapageSaga });
  return { actions: slice.actions };
};

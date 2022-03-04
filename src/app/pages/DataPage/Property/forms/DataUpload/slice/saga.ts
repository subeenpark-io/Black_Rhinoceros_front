import { call, put, takeLatest } from 'redux-saga/effects';
import { postDataset } from './api';
import { actions } from '.';

export function* postDatasetSaga(action) {
  const dataset = action.payload;

  try {
    const response = yield call(postDataset, dataset);
    yield put(actions.postDatasetSuccess(response.data));
  } catch (error) {
    yield put(actions.postDatasetFail(error));
  }
}

export function* DataUploadSaga() {
  yield takeLatest(actions.postDatasetRequest.type, postDatasetSaga);
}

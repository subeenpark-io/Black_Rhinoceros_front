import { call, put, takeLatest } from 'redux-saga/effects';
import { getColumnAttributes } from './api';
import { actions } from '.';

export function* fetchColAttrsSaga(action) {
  const { datasetId } = action.payload;

  try {
    const response = yield call(getColumnAttributes, { datasetId });
    yield put(actions.fetchColAtrrsSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchColAttrsFail(error));
  }
}

export function* MultiSelectSaga() {
  yield takeLatest(actions.fetchColAttrsRequest.type, fetchColAttrsSaga);
}

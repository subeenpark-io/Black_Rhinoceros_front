import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  getParamForm,
  tryRunDag,
  postDataset,
  getColumnAttributes,
} from './api';
import { actions } from '.';

const getDagData = ({ id, name, nodes, edges }) => {
  const postableNodes = nodes.map(node => {
    return {
      id: node.id,
      moduleType: node.type,
      position: node.position,
      data: { label: node.data.label, params: node.data.params },
    };
  });

  const postableEdges = edges.map(edge => {
    return {
      sourcePort: {
        nodeId: edge.source,
        portType: edge.sourceHandle,
      },
      targetPort: {
        nodeId: edge.target,
        portType: edge.targetHandle,
      },
    };
  });

  return {
    id,
    name,
    nodes: postableNodes,
    edges: postableEdges,
  };
};

export function* tryRunDagSaga(action) {
  const { id, name, nodes, edges } = action.payload;
  const dagData = getDagData({ id, name, nodes, edges });

  try {
    const response = yield call(tryRunDag, dagData);
    yield put(actions.tryRunDagSuccess(response.data));
  } catch (error) {
    yield put(actions.tryRunDagFail(error));
  }
}

export function* fetchParamFormSaga() {
  try {
    const response = yield call(getParamForm);
    yield put(actions.fetchParamFormSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchParamFormFail(error));
  }
}

export function* postDatasetSaga(action) {
  const dataset = action.payload;

  try {
    const response = yield call(postDataset, dataset);
    yield put(actions.postDatasetSuccess(response.data));
  } catch (error) {
    yield put(actions.postDatasetFail(error));
  }
}

export function* fetchColAttrsSaga(action) {
  const { datasetId } = action.payload;

  try {
    const response = yield call(getColumnAttributes, { datasetId });
    yield put(actions.fetchColAtrrsSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchColAttrsFail(error));
  }
}

export function* DatapageSaga() {
  yield all([
    takeLatest(actions.tyrRunDagRequest.type, tryRunDagSaga),
    takeLatest(actions.fetchParamFormRequest.type, fetchParamFormSaga),
    takeLatest(actions.postDatasetRequest.type, postDatasetSaga),
    takeLatest(actions.fetchColAttrsRequest.type, fetchColAttrsSaga),
  ]);
}

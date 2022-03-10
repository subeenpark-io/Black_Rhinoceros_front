import testApi from 'utils/api/testApi';

export const tryRunDag = body => {
  return testApi.post('/graph/run', body);
};

export const getParamForm = () => {
  return testApi.get('/nodes/properties');
};

export const postDataset = dataset => {
  return testApi.post('/dataset', dataset, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getColumnAttributes = ({ datasetId }) => {
  return testApi.get(`/dataset/${datasetId}/meta`);
};

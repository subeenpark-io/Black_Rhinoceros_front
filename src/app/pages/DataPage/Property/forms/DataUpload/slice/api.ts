import testApi from 'utils/api/testApi';

export const postDataset = dataset => {
  return testApi.post('/dataset', dataset, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

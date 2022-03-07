import testApi from 'utils/api/testApi';

export const getColumnAttributes = ({ datasetId }) => {
  return testApi.get(`/dataset/${datasetId}/meta`);
};

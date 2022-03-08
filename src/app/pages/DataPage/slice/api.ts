import testApi from 'utils/api/testApi';

export const tryRunDag = body => {
  return testApi.post('/graph/run', body);
};

export const getParamForm = () => {
  return testApi.get('/nodes/properties');
};

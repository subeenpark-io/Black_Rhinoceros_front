import axios from 'axios';

const BASE_URL =
  'http://ec2-13-124-117-119.ap-northeast-2.compute.amazonaws.com:8000';
const testApi = axios.create({
  baseURL: BASE_URL,
});

export default testApi;

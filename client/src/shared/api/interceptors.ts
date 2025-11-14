import axios from 'axios';

import { appConfig } from './config';

const { API_URL, API_VERSION } = appConfig;

const api = axios.create({
  baseURL: `${API_URL}/${API_VERSION}`,
  timeout: 10_000,
});

export { api };

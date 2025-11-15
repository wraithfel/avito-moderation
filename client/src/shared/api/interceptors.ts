import axios from 'axios';
import { appConfig } from './config';

const { API_URL, API_VERSION } = appConfig;

const api = axios.create({
  baseURL: `${API_URL}/${API_VERSION}`,
  timeout: 10_000,
  paramsSerializer: (params) => {
    const parts: string[] = [];

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      const values = Array.isArray(value) ? value : [value];
      values.forEach((v) => {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
      });
    });

    return parts.join('&');
  },
});

export { api };

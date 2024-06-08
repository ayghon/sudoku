import { BASE_URL } from '@env';
import axios from 'axios';

export const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
});

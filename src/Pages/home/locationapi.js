// locationapi.js
import axios from 'axios';

const API_KEY = 'RmYyOHVGMnBSS0VoRUc5cTRMMmhnc2UwdE1WdVZqaHRicnhMbzJ6eA==';

const axiosInstance = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1',
  headers: {
    'X-CSCAPI-KEY': API_KEY,
  },
});

export const getCountries = () => axiosInstance.get('/countries');
export const getStates = (countryCode) =>
  axiosInstance.get(`/countries/${countryCode}/states`);
export const getCities = (countryCode, stateCode) =>
  axiosInstance.get(`/countries/${countryCode}/states/${stateCode}/cities`);

import { getHeaders } from './auth';

const api = 'https://api.github.com/search/users';
const perPage = 10;

export const search = async (query, page) => {
  const request = `${api}?q=${query}&page=${page}&per_page=${perPage}`;
  const headers = await getHeaders();
  const response = await fetch(request, { headers });
  return await response.json();
};

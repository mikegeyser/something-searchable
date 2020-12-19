import { getHeaders } from './auth';

const searchApi = 'https://api.github.com/search/users';
const userApi = 'https://api.github.com/users';

export const search = async (query, page, perPage) => {
  const request = `${searchApi}?q=${query}&page=${page}&per_page=${perPage}`;
  const headers = await getHeaders();
  const response = await fetch(request, { headers });
  return await response.json();
};

export const user = async (login) => {
  const request = `${userApi}/${login}`;
  const headers = await getHeaders();
  const response = await fetch(request, { headers });
  return await response.json();
};

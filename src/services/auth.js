// Let's my disable the token checking, so I can test the worst case reate limiting scenario.
const useAnonymousApi = false;

let token;

export const getHeaders = async () => {
  if (useAnonymousApi) return {};

  if (!token) {
    console.log(process.env.NODE_ENV);
    const request = '/api/token';
    const response = await fetch(request, { method: 'post' });
    token = await response.text();
  }

  return { Authorization: `token ${token}` };
};

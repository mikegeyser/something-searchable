let token;

export const getHeaders = async () => {
  if (!token) {
    console.log(process.env.NODE_ENV);
    const request = '/api/token';
    const response = await fetch(request, { method: 'post' });
    token = await response.text();
  }

  return { Authorization: `token ${token}` };
};

const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
  // Set 'now' to 30 seconds ago, in unix standard time in order to avoid 'being in the future'.
  const now = Math.floor(new Date().getTime() / 1000) - 30;
  const payload = {
    iat: now,
    exp: now + 100,
    iss: 93276,
  };

  // Get the secrets out of the environment variables.
  const { private_key, installation } = process.env;

  // Sign the app token using the private key.
  const jwtToken = jwt.sign(payload, private_key, { algorithm: 'RS256' });

  // Get an access token using the app token and my installation.
  const api = `https://api.github.com/app/installations/${installation}/access_tokens`;
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    Accept: 'application/vnd.github.v3+json',
  };
  const method = 'post';
  const response = await fetch(api, { headers, method });
  const { token } = await response.json();

  context.res = {
    body: token,
  };
};

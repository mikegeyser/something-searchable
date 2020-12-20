# Something searchable

To explore: 

[https://kind-island-0ce9d670f.azurestaticapps.net/](https://kind-island-0ce9d670f.azurestaticapps.net/)

To run:

```
> npm start
```

To build:

```
> npm run build
```

The technologies used were preact, redux and serverless functions. The site is built using webpack, deployed using github actions, and hosted with azure static web apps.

All of the front end code was implemented using a relatively standard preact and redux approach, using the redux toolkit. I chose the redux toolkit over built in hooks, because I believed that the pagination case would make it much more complicated and result in everything being tied to a single component. I think this worked out well, and all of the individual page elements are standalone, and compact. I didn't use the preact-cli, because I'm not actually very familiar with it, and didn't think this was the time to try. I've gone for a very similar webpack build process that I use from day-to-day. 

The biggest challenge was to work around the rate limiting restrictions on the github api, without asking the user to authenticate, due to the N+1 nature of calling the search results for a page and then calling the user endpoint for every result. To accomplish this, I registered a GitHub App and used that workflow to create an access token. To not expose the private key used for signing, I needed to have some kind of trusted environment in which to generate the JWT token - for which the simplest was a serverless function. This improves the rate limiting from 10 requests per minute to 5000 requests per hour. This makes the api functional for a small group of users, but would ultimately still be a problem with any kind of access at scale.

To make best usage of the api access available, I added a service worker using workbox with a short duration cache. This means that if a user pages several times, or refines search results and the pages contain some of the same records. Not super necessary, but I think it makes the experience a little nicer.

Things I would have wanted to complete:
 - *Exponential backoff:* The first is an exponential backoff using the workbox queue, so that when a rate-limit is reached it would queue requests for retry. The idea being that if the user was still on a page, the backoff could retry and publish messages to redux and update the results. Changing search or pages would clear the queue. I just ran out of time for this one, and the background sync api isn't easy to work with, even with workbox.
 - *Search filters:* It would have been fun to add a more compelling search filter experience. The github api supports a bunch of interesting query combinations, and I would have liked to build some kind of autocomplete prompting for the input. I think this is way too ambitious for a few days work, so I decided to focus elsewhere.
 - *Tests:* Up until stopping I had every intention to add some tests to the project. I couldn't decide whether to use simple jest unit tests, or puppeteer end-to-end tests, and in the end did neither. :( Test infrastructure can be a bit of a pain to set up, and I ran out of time, so I think it was the right call in the end.


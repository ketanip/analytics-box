# Analytics Box

![Analytics-Box demo dashboard image](./assets/dashboard/1.jpg)

### What is Analytics Box ?

Analytics box is a privacy focused analytics tool. This tool is build for websites to know its users without invading their privacy.

### Features
1. Works with session storage and cookies (opt-in by website owner).
2. No fingerprinting of user on server.
3. Custom events are supported.
4. Super simple to setup. ( 1 go binary + 1 super small script on frontend ).
5. Super low resource consumption.
6. Uses Postgres so it can scale a lot without using a lot of resources.

### Tech Stack
1. **Golang** on backend because of its speed and low resource consumption.
2. **React** in dashboard because of its library support.
3. **Typescript** both dashboard and tracking script are written in typescript for intellisense and to reduce bugs.
4. **Postgres** as main database as it has a very low resource consumption and people can run it on the same VPS or server along with other parts of analytics box on which they run their website so this could be use in a more wide spread manner. If you grow at a very fast pace and generate a lot of data then you can switch to TimeScale DB or Citus Data for your needs as they offer amazing data compression along with fast analytics data results and are super simple to setup and migrate from postgres and are compatible with it.

### Why use Session storage and Cookies ?
Now a days there is a mad craze for cookie-less website and analytics to not to show users concent banner and this is achieved in some what controversial way in my opinion as they are fingerprinting user on server side and there is no way for the user to reset tracking id as there is no way to do so.

But when users use cookie or session storage they can clear their cookies and create a new tracking id, so using cookie or session storage gives user control over their privacy. So that is why we have decided to use session storage (default) and cookie (opt-in by website owner) for tracking users.
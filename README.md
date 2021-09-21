# Analytics Box

![](./assets/c/1.jpg)
![](./assets/c/2.jpg)

Hello guys, this is privacy friendly analytics tool, Analytics Box for web written in go. It ensures user privacy but at the same time also provides key metrics that will ensure your business does good while keeping user privacy in mind.

**Important**: Dashboard is now functional Analytics box can now be used by brave souls, there may be some more breaking changes so beware of it and frontend is not in the best condition so you may 
encounter some bugs and if you find then please create a issue and let me know I will fix it.

**Important Announcement**: 
I've decided to move away from using UUID and instead use nanoid as it consumes less space in database and its library has a small size so it reduces the size of tracking script. Tracking script also has some new features like you can opt in to use cookies instead of session storage and some more features.

You can use tracking script from CDN with `src="https://cdn.jsdelivr.net/gh/ketanip/analytics-box/tracker/dist/index.js"`.

### What is Analytics Box ?

Analytics box is analytics tool like google analytics but instead of ripping user's privacy off them like google it respects their privacy and doesn't collect any unnecessary information.

### Features
1. Works with and without cookies.
2. No fingerprinting of user on server.
3. Can track unique page views effectively without hurting user's privacy, no fingerprinting user.
4. Custom events are supported.
5. Super simple to setup. ( 1 go binary + 1 super small script on frontend ).
6. Super low resource consumption.
7. Uses Postgres so it can scale a lot without using a lot of resources.

# Todo
- [X] Added Docs.
- [ ] Add auth.


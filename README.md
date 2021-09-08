<img src="./assets/logo.png" width="100"></img>

Hello guys, this is privacy friendly analytics tool, Analytics Box for web written in go. It ensures user privacy but at the same time also provides key metrics that will ensure your business does good while keeping user privacy in mind.

**Announcement**: We soon will be adding dashboard to the this project itself as it would reduce a lot of managment tensions in production.

### What is Analytics Box ?

Analytics box is analytics tool like google analytics but instead of ripping user's privacy off them like google it respects their privacy and doesn't collect any unnecessary information.

### Features
1. No Cookies.
2. Forgets user in 24 hours so even if wish to know user's private info you can't.
3. Can track unique page views effectively without hurting user's privacy.
4. Custom events available.
5. Super simple to setup. ( 1 go binary + 1 super small script on frontend ).
6. Super low resource consumption.
7. Dashboard is decoupled from the tool so you can use any tool ( like Metabase for visualization of data ).
8. Uses Clickhouse so scale is not a problem for it.
9. Transaction support by default so it won't hurt your database and it can work well with databases like clickhouse.

### Read the docs and more about the project [here](https://ketanip.gitbook.io/analytics-box).

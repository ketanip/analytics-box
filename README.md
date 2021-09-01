<img src="./assets/mascot.png" width="300"></img>

Hello guys, this is privacy friendly analytics tool for web written in go. It ensures user privacy but at the same time also provides key metrics that will ensure your business does good while keeping user privacy in mind.


### What makes it diffrent.
There are many privacy friendly analytics tool but here are some points that makes it special.

1. It is written in go so you can but it on the same server as your app as it uses nearly to negligible amount of reousrce ( in large schema of things ).
2. It is written in go fiber which can handle a by lot I mean around 35,000 requests per second ( as per their website).
3. It currenlty supports PostgresSQL and in future I plan to add support for Clickhouse because of its amazing perfomance, and I will continue to keep postgres supported for as long as possible because of its low resource consumption it would be a great tool for small websited like blogs, like one that[I have](https://ketaniralepatil.com) though it hasn't been updated for a while now.
4. I don't plan to convert it into a SaaS application ( atleast in near future ) as I don't want to make another saas privacy focused anlytics app as there are already many good in market. I'm making this in a way that you can get most insights from your data so it doesn't have a dashboard ( use someting like metabase for it here are some screenshots of dashboard that I build within 3-4 minutes while writing this readme and I'm no profession and it on par with what saas provides apps provides to you) with complete control over your data and it can run on simple commodity hardware for a long period of time without any manual intervisions.

<img src="./assets/1.png" width="500"></img>
<img src="./assets/2.png" width="500"></img>
<img src="./assets/3.png" width="500"></img>


### Features
1. No Cookies.
2. Forgets user in 24 hours so even if wish to know user's private info you can't.
3. Can track unique page views effectively without hurting user's privacy.
4. Custom events avilable.
5. Super simple to setup. ( 1 go binary + 1 super small script on frontend ).
6. Super low resource consumption.


### Important Changes
I've decided not to add any kind of dashboard to it, I think people using this should use something like metabase they can use it locally. Here are some of the reasons for my decision, if you have any other good ideas please start a discussion in discussions tab.

1. You don't have the complete flexiblity over which metrics and to compare it with others metrics like you have in some application like metabase.
2. A dashboard is designied for everyone in mind so people will miss cusomization ( I'm not talking about colours and stuff I mean metrics that may be important for you.)
3. A person with no coding experince ( for example someone in managment can use an application for getting out metrics without messing out anything and with within seconds).
4. Building dashboard is hard that everyone will appericiate and it takes a lot of time.
5. You can just change driver of sqlx and you can use something like RDS with just one insert query ( for adding anlytics data to database)  and use metabase with it to generate your dashboard with just a few clicks so scaliblity shouldn't be a problem.
6. You could use SQL to interact with database and gather more insight from the same data.

**Disclaimer**: I'm not sponsored by metabase (but if you do I will appericiate it 😜)in any way, I just enjoy it a lot to use, it is super simple and with zap button it automatically generates dashboard for you so you are ready to use your data in no time.

**Note**: I haven't tested it on and SPA so I can't say anyting about it.

### How to run locally

```bash
# Clone the repo
git clone https://github.com/KetanIP/analytics.git
cd ./analytics
```

# It contains two parts backend and tracker.

1. Backend

Create a `config.json` file from the schema from as shown below and run the following command.

```bash
go run ./main.go
```

`config.json` schema: 

```json
{

    // Test mode true or false.
    "test_mode": true,

    // Search on google what is my ip and a snippet with your Public IP will appear there.
    "test_ip": "YOUR_PUBLIC_IP_HERE", 

    // Postgres Connection URL.
    "database_url": "postgres://username:password@localhost:5432/analyticsdb?sslmode=disable",

    // Load queries from a file. Keep is same.
    "queries_file": "./queries/pg_queries.sql",

    // Database driver for the time being keep it "postgres" otherwise things will break.
    "database_driver": "postgres"
}
```

2. Frontend

It also contains a `index.html` file for testing purposes. To run use tracking script you need to two dependencies. To install those run,

```bash
npm i
npm i -D parcel
npm i -D browserify
```

To run for dev purposes run, it runs a dev server on http://localhost:1234/ vai parcel.
```bash
npm run dev
```

To get tracker build file, it will return a main.js file with dependencies included in `./dist` folder.
```
npm run build
```

### How to contribute
```bash
# Clone the repo
git clone https://github.com/KetanIP/analytics.git

# Make some changes and create a pull request.
```
**Note**: Sorry guys I deleted this repo and then created it again as I somehow managed to leak my public IP so I need to do that but now I just IP of a VPN node in config so event if that happens again I won't need to delete the whole repo. 

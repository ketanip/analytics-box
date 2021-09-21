# How to Install Analytics Box ?

This is for local installation, soon when stable version gets released then we will create a docker compose for production environment.

### Tech Requirements

1. Golang on your machine.
2. Node JS and npm installed on your machine.

### Installation

```bash
# Cloning the repo.
$ git clone https://github.com/ketanip/analytics-box
```

Folder structure.
```yaml
analytics-box
    - backend
    - dashboard
    - tracker
```


**Backend**

To run backend you need to create a `config.json`, the template for `config.json` file is as shown below.

Just change `POSTGRES_DATABASE_URL` and keep the rest same.

```json
{
    "test_mode": true,
    "test_ip": "1.1.1.1",
    "database_url": "POSTGRES_DATABASE_URL",
    "queries_file": "./queries/queries.sql",
    "transaction_sleep_time": 1000,
    "minimum_transaction_count": 100
}
```

To run backend type the following commands.
```bash

$ cd ./backend
$ go run ./main.go

```
Tt will start on port [https://localhost:8000](https://localhost:8000).


**Dashboard**
To run dashboard use the following commands.

If you use npm.
```bash
$ cd ./dashboard
$ npm i
$ npm run start
```

If you use yarn.
```bash
$ cd ./dashboard
$ yarn
$ yarn start
```

It will start on port 3000 and will give error or show a blank page as it has no data. This issue is yet to be fixed.


**Tracker**

This contains source code for tracker and you can also build it with parcel to use it in normal HTML webpages aka not fancy javascript frameworks it supports those too.

This also includes a `html` page with tracker installed on it to generate dummy data and for local testing.

Commands.

```bash
# Run local dev page.
$ yarn dev

# To bundle all ts files into to a single js file.
$ yarn build
```


If you find any bugs report it, by creating a issue on the repo.
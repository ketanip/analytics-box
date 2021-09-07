package db

import (
	"encoding/json"
	"io/ioutil"

	_ "github.com/go-sql-driver/mysql" // MySQL driver.
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"               // Postgres driver.
	_ "github.com/mailru/go-clickhouse" // Clickhouse driver.
	"github.com/qustavo/dotsql"
)

// DB is database instance.
var (
	DB      *sqlx.DB
	Queries *dotsql.DotSql
	Config  Configuration
)

// Configuration struct.
type Configuration struct {
	TestMode                bool   `json:"test_mode"`
	TestIP                  string `json:"test_ip"`
	DatabaseURL             string `json:"database_url"`
	DatabaseDriver          string `json:"database_driver"`
	QueriesFolder           string `json:"queries_folder"`
	TransactionSleepTime    int    `json:"transaction_sleep_time"`
	MinimumTransactionCount int    `json:"minimum_transaction_count"`
}

// LoadConfig loads config from a config.json file.
func LoadConfig() {

	// To loads configuration from config.json
	config := Configuration{}

	// Reading config.json
	data, err := ioutil.ReadFile("./config.json")
	if err != nil {
		panic(err)
	}

	// Loading data to config.
	if err = json.Unmarshal(data, &config); err != nil {
		panic(err)
	}

	// Loading data to global varible for later use.
	Config = config

}

// CreateConnection creates connection to database
func CreateConnection() {

	// exactly the same as the built-in
	db, err := sqlx.Connect(Config.DatabaseDriver, Config.DatabaseURL)
	if err != nil {
		panic(err)
	}

	// force a connection and test that it worked.
	if err := db.Ping(); err != nil {
		panic(err)
	}

	// assigning db to global varible DB.
	DB = db

}

// LoadSQLQueries loads sql queries from file.
func LoadSQLQueries() {

	// Loading queried from file.
	dot, err := dotsql.LoadFromFile(Config.QueriesFolder + Config.DatabaseDriver + ".sql")
	if err != nil {
		panic(err)
	}

	// Assigning dot to global variable for further use.
	Queries = dot

}

// CreateTables creates required databases.
func CreateTables() {

	// Loading and executing "create-events-table" which
	// creates table in database if it doesn't exits.
	_, rerr := Queries.Exec(DB.DB, "create-events-table")
	if rerr != nil {
		panic(rerr)
		panic("Failed to load create events table.")
	}

}

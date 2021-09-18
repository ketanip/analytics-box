package db

import (
	"encoding/json"
	"io/ioutil"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq" // Driver for postgres SQL
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
	QueriesFile             string `json:"queries_file"`
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

	// Loading data to global variable for later use.
	Config = config

}

// CreateConnection creates connection to database
func CreateConnection() {

	// exactly the same as the built-in
	db, err := sqlx.Connect("postgres", Config.DatabaseURL)
	if err != nil {
		panic(err)
	}

	// force a connection and test that it worked.
	if err := db.Ping(); err != nil {
		panic(err)
	}

	// assigning db to global variable DB.
	DB = db

}

// LoadSQLQueries loads sql queries from file.
func LoadSQLQueries() {

	// Loading queried from file.
	dot, err := dotsql.LoadFromFile(Config.QueriesFile)
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
	_, rerr := Queries.Exec(DB, "create-events-table")
	if rerr != nil {
		panic("Failed to load create events table.")
	}

}

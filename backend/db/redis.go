package db

import (
	"github.com/go-redis/redis/v8"
)

var (

	// RedisDB is instance of a redis client.
	RedisDB *redis.Client
)

// CreateRedisClient creates new redis client.
func CreateRedisClient() {

	// Creating redis connection.
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	// Assining to global varible for further use.
	RedisDB = rdb

}

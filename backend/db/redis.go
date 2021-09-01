package db

import (
	"context"
	"time"

	"github.com/go-redis/redis/v8"
)

var (

	// RedisDB is instance of a redis client.
	RedisDB *redis.Client

	// Context for redis
	ctx = context.Background()
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

// AddKV adds given key-value to database
func AddKV(key, val string, ttl time.Duration) error {

	err := RedisDB.Set(ctx, key, val, ttl).Err()
	if err != nil {
		return err
	}

	return nil

}

// GetKV adds given key-value to database
func GetKV(key string) (string, error) {

	// Getting value from database.
	val := RedisDB.Get(ctx, key)

	// returning value
	result, err := val.Result()
	return result, err

}

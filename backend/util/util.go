package util

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/ketanip/analytics/db"
)

var (
	// Secret key used to keep user_id secret or just use a
	// new uuid every time the server starts and stops and don't print or log it
	// For testing use a string as it will not generate 100s of unique user id for same user.
	secretHashKey = "REPLACE_THIS_WITH_SOME_SUPER_SECRET_KEY_AND_ROTATE_IT_REGULARY"
)

// CreateUniqueVisitorID creates unique visitor id ( uuid ).
func CreateUniqueVisitorID(domain string, ip string, browser string, operatingSystem string) string {

	// Gettting today's date.
	currentTime := time.Now()
	currentDate := currentTime.Format("01-02-2006")

	// Creating hash payload/
	hashBody := domain + ip + browser + operatingSystem + currentDate + secretHashKey

	// Hashing data and returning it in string format.
	algorithm := md5.New()
	algorithm.Write([]byte(hashBody))
	hexVal := hex.EncodeToString(algorithm.Sum(nil))

	// Gettting user UUID
	userUUID := GetUserUUID(hexVal)
	return userUUID

}

// GetUserUUID finds or generates UUID for visitor id.
func GetUserUUID(visitorID string) string {

	// Getting old user id if it exists.
	val, err := db.GetKV(visitorID)
	if err == nil {
		return val
	}

	// Generating new UUID to store in database.
	id := uuid.New()
	newID := id.String()

	// ttl for 24 hours.
	ttl := time.Duration(24) * time.Hour
	fmt.Printf("ttl: %v\n", ttl)

	// Adding to redis.
	rerr := db.AddKV(visitorID, newID, ttl)
	if rerr != nil {
		panic(rerr)
	}

	// retuning new UUID
	return newID

}

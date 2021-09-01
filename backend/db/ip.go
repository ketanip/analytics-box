package db

import (
	"log"
	"net"

	"github.com/oschwald/geoip2-golang"
)

// GeoDB is a instance of geoip2-golang
var GeoDB *geoip2.Reader

//OpenGeoIPDb loads GeoIP database in memory
func OpenGeoIPDb() {

	// Loading Maxmind's Geo Lite database.
	db, err := geoip2.Open("./GeoLite2-Country.mmdb")
	if err != nil {
		log.Fatal(err)
	}

	// Saving db to a global varible for further use.
	GeoDB = db

}

// IPParser parses given ip and returns ISO code of the country
func IPParser(ip string) string {

	// Parsing incoming IP.
	parsedIP := net.ParseIP(ip)

	// Getting Country of parsed IP.
	country, err := GeoDB.Country(parsedIP)
	if err != nil {
		log.Fatal(err)
	}

	// Returning country ISO Code.
	return country.Country.IsoCode

}

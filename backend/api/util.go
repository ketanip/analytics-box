package api

import (
	"strings"
	"time"

	"github.com/ketanip/analytics/db"
	"github.com/ketanip/analytics/event"
	"github.com/mssola/user_agent"
)

// ProcessIncomingData processes incoming data in a go routine
// so it becomes a non blocking operation and it reduced response time from 3-4 ms
// down to 0-1 ms.
func ProcessIncomingData(userAgent string, ip string, data PayloadData) {

	// Parsing user agent.
	UserAgentData := user_agent.New(userAgent)
	browser, browserVersionRaw := UserAgentData.Browser()
	browserVersion := strings.Split(browserVersionRaw, ".")[0]

	// Getting user country.
	userCountry := db.IPParser(ip)

	// Event object
	event := event.Event{

		// Core
		SessionID:          data.SessionID,
		Event:              data.Event,
		IsBot:              UserAgentData.Bot(),
		Time:               time.Now(),
		Domain:             data.Domain,
		PageRoute:          data.PageRoute,
		Duration:           data.Duration,
		ScrolledPercentage: data.ScrolledPercentage,

		// User-Agent
		OperatingSystem:        UserAgentData.OSInfo().Name,
		OperatingSystemVersion: UserAgentData.OSInfo().Version,
		Browser:                browser,
		BrowserVersion:         browserVersion,

		// Referrer
		CountryCode: userCountry,
		Referrer:    data.Referrer,

		// UTM Data
		UTMSource:   data.UTMSource,
		UTMMedium:   data.UTMMedium,
		UTMCampaign: data.UTMMedium,

		// Device Data
		DeviceHeight: data.DeviceHeight,
		DeviceWidth:  data.DeviceWidth,
	}

	// Adding event to transaction que.
	event.AddEvent()

}

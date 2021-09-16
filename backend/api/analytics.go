package api

import (
	"encoding/json"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/ketanip/analytics/db"
	"github.com/ketanip/analytics/event"
	"github.com/mssola/user_agent"
)

// AnalyticsDataHandler is used to handle incoming beacon request.
//
// Method: POST
func AnalyticsDataHandler(c *fiber.Ctx) error {

	// Variables to extract data
	payload := new(Payload)
	data := new(PayloadData)

	// Parsing beacon form submission for payload data.
	if err := c.BodyParser(payload); err != nil {
		return nil
	}

	// Loading payload into a struct.
	if err := json.Unmarshal([]byte(payload.Data), &data); err != nil {
		return nil
	}

	// IP Parsing to obtain user's country
	var ip string
	if db.Config.TestMode == true {
		ip = db.Config.TestIP
	} else {
		ip = c.IP()
	}

	// Getting user agent
	userAgent := string(c.Request().Header.Peek("User-Agent"))

	// Processing incoming data.
	go ProcessIncomingData(userAgent, ip, *data)

	// Return no error.
	return nil

}

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

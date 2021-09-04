package api

import (
	"encoding/json"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/ketanip/analytics/db"
	"github.com/ketanip/analytics/event"
	"github.com/ketanip/analytics/util"
	"github.com/mssola/user_agent"
)

// AnalyticsDataHandler is used to handle incoming beacon request.
//
// Method: POST
func AnalyticsDataHandler(c *fiber.Ctx) error {

	// Varibles to extract data
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

	// Parsing user agent.
	UserAgentData := user_agent.New(string(c.Request().Header.Peek("User-Agent")))
	browser, browserVersionRaw := UserAgentData.Browser()
	browserVersion := strings.Split(browserVersionRaw, ".")[0]

	// Var to load user country.
	var userCountry string

	// IP Parsing to obtain user's country
	if db.Config.TestMode == true {
		userCountry = db.IPParser(db.Config.TestIP)
	} else {
		userCountry = db.IPParser(c.IP())
	}

	// Generating unique user ID.
	userID := util.CreateUniqueVisitorID(data.Domain, c.IP(), browser, UserAgentData.OS())

	// Event object
	event := event.Event{

		// Core
		VisitorID:          userID,
		Event:              data.Event,
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

	// Return no error.
	return nil

}

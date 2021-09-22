package api

import (
	"encoding/json"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/ketanip/analytics/db"
	"github.com/ketanip/analytics/reports"
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

// ReportsAPI return report object for given filters.
func ReportsAPI(c *fiber.Ctx) error {

	// Getting data
	start := c.Query("start")
	end := c.Query("end")
	domain := c.Query("domain")
	event := c.Query("event")

	if start == "" {
		c.SendString("Start Date not given.")
		return nil
	}

	if end == "" {
		c.SendString("End Date not given.")
		return nil
	}

	if domain == "" {
		c.SendString("Domain not given.")
		return nil
	}

	if event == "" {
		c.SendString("Event not given.")
		return nil
	}

	// Parsing Dates
	startDate, _ := time.Parse("2006-01-02", start)
	endDate, _ := time.Parse("2006-01-02", end)

	// Making report filter.
	report := reports.Filter{
		Domain:          domain,
		Event:           event,
		StartDate:       startDate,
		EndDate:         endDate,
		PageRoute:       c.Query("page_route"),
		Referer:         c.Query("referer"),
		Browser:         c.Query("browser"),
		OperatingSystem: c.Query("os"),
		CountryCode:     c.Query("country_code"),
		WhereQuery:      "",
	}

	// Genrating and getting all reports.
	report.GenerateWhereQueries()
	report.GetOverview()
	report.GetDataAnalysis("os")
	report.GetDataAnalysis("event")
	report.GetDataAnalysis("country")
	report.GetDataAnalysis("browser")
	report.GetDataAnalysis("referer")
	report.GetDataAnalysis("page-view")
	report.GetDataAnalysis("utm-source")
	report.GetDataAnalysis("utm-medium")
	report.GetDataAnalysis("utm-campaign")

	// Sending reports.
	c.JSON(report)
	return nil

}

package event

import (
	"time"

	"github.com/ketanip/analytics/db"
)

// Event type.
type Event struct {

	// Core
	ID    int       `json:"id" db:"id"`
	Event string    `json:"event" db:"event"`
	Time  time.Time `json:"time" db:"time"`

	// Frontend
	Domain             string `json:"domain" db:"domain"`
	PageRoute          string `json:"page_route" db:"page_route"`
	Duration           int    `json:"duration" db:"duration"`
	ScrolledPercentage int    `json:"scrolled_percentage" db:"scrolled_percentage"`
	Referrer           string `json:"referrer" db:"referrer"`

	// User Agent
	OperatingSystem        string `json:"operating_system" db:"operating_system"`
	OperatingSystemVersion string `json:"operating_system_version" db:"operating_system_version"`
	Browser                string `json:"browser" db:"browser"`
	BrowserVersion         string `json:"browser_version" db:"browser_version"`

	// IP Data
	VisitorID   string `db:"visitor_id"`
	IsBot       int8   `db:"is_bot"`
	CountryCode string `json:"country_code" db:"country_code"`

	// UTM Data
	UTMSource   string `json:"utm_source" db:"utm_source"`
	UTMMedium   string `json:"utm_medium" db:"utm_medium"`
	UTMCampaign string `json:"utm_campaign" db:"utm_campaign"`

	// Device Type
	DeviceWidth  int `json:"device_width" db:"device_width"`
	DeviceHeight int `json:"device_height" db:"device_height"`
}

// SaveEvent is used to save event in the database.
func (event *Event) SaveEvent() {

	// Getting Raw query.
	query, err := db.Queries.Raw("create-event")
	if err != nil {
		panic("Failed to load create-event query.")
	}

	// Saving event to database.
	_, rerr := db.DB.NamedQuery(query, &event)
	if rerr != nil {
		panic(rerr)
	}

}

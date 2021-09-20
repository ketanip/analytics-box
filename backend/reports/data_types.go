package reports

import (
	"time"
)

// Filter struct.
type Filter struct {
	Domain          string    `json:"domain" db:"domain"`
	Event           string    `json:"event" db:"event"`
	StartDate       time.Time `json:"start_date" db:"start_date"`
	EndDate         time.Time `json:"end_date" db:"end_date"`
	PageRoute       string    `json:"page_route" db:"page_route"`
	Referer         string    `json:"referer" db:"referer"`
	Browser         string    `json:"browser" db:"browser"`
	OperatingSystem string    `json:"operating_system" db:"operating_system"`
	CountryCode     string    `json:"country_code" db:"country_code"`
	WhereQuery      string    `json:"-"`
	Data            Report    `json:"data" db:"data"`
}

// Report struct.
type Report struct {
	Overview         OverviewAnalysis `json:"overview"`
	Analysis         []BaseAnalysis   `json:"analysis"`
	Referers         []BaseAnalysis   `json:"referers"`
	OperatingSystems []BaseAnalysis   `json:"operating_systems"`
	Browsers         []BaseAnalysis   `json:"browsers"`
	PageViews        []BaseAnalysis   `json:"page_views"`
	Countries        []BaseAnalysis   `json:"countries"`
}

// BaseAnalysis struct.
type BaseAnalysis struct {
	Value           *string  `json:"value"`
	TotalSessions   *int     `json:"total_sessions"`
	UniqueSessions  *int     `json:"unique_sessions"`
	DurationSeconds *float32 `json:"duration_seconds"`
}

// OverviewAnalysis struct.
type OverviewAnalysis struct {
	TotalSessions   *int     `json:"total_sessions"`
	UniqueSessions  *int     `json:"unique_sessions"`
	AverageDuration *float32 `json:"average_duration"`
}

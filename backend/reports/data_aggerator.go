package reports

import (
	"log"

	"github.com/ketanip/analytics/db"
)

// GetDataAnalysis gets analysis for given filter.
func (filter *Filter) GetDataAnalysis(analysisFor string) {

	// To store data from result rows.
	var result []BaseAnalysis

	// Quering data.
	rows, err := db.DB.NamedQuery(
		GetQuery("get-"+analysisFor+"-analysis", *filter),
		filter,
	)
	if err != nil {
		panic(err)
	}

	// Looping through rows to get its value.
	for rows.Next() {

		var row BaseAnalysis

		// Scanning data from row.
		if err := rows.Scan(
			&row.UniqueSessions,
			&row.TotalSessions,
			&row.DurationSeconds,
			&row.Value,
		); err != nil {
			// Check for a scan error.
			// Query rows will be closed with defer.
			log.Fatal(err)
		}

		// Appending to final result
		result = append(result, row)

	}

	switch analysisFor {
	case "referer":
		filter.Data.Referers = result
	case "os":
		filter.Data.OperatingSystems = result
	case "browser":
		filter.Data.Browsers = result
	case "page-view":
		filter.Data.PageViews = result
	case "event":
		filter.Data.Analysis = result
	case "country":
		filter.Data.Countries = result
	}
}

// GetOverview gets analysis for given filter.
func (filter *Filter) GetOverview() {

	// To store data from result rows.
	var result OverviewAnalysis

	// Quering data.
	rows, err := db.DB.NamedQuery(
		GetQuery("get-overview-analysis", *filter),
		filter,
	)
	if err != nil {
		panic(err)
	}

	// Looping through rows to get its value.
	for rows.Next() {

		// Scanning data from row.
		if err := rows.Scan(
			&result.UniqueSessions,
			&result.TotalSessions,
			&result.AverageDuration,
		); err != nil {
			// Check for a scan error.
			// Query rows will be closed with defer.
			log.Fatal(err)
		}

	}

	filter.Data.Overview = result

}

package reports

import (
	"log"
	"strings"

	"github.com/ketanip/analytics/db"
)

var ()

// GenerateWhereQueries populates `Queries` for further use.
func (filter *Filter) GenerateWhereQueries() {

	// Queries contains where queries.
	var Queries []string

	if filter.PageRoute != "" {
		Queries = append(Queries, "page_route=:page_route")
	}

	if filter.Referer != "" {
		Queries = append(Queries, "referrer=:referer")
	}

	if filter.Browser != "" {
		Queries = append(Queries, "browser=:browser")
	}

	if filter.OperatingSystem != "" {
		Queries = append(Queries, "operating_system=:operating_system")
	}

	if filter.CountryCode != "" {
		Queries = append(Queries, "country_code=:country_code")
	}

	WhereQuery := strings.Join(Queries, " AND ")

	if len(WhereQuery) > 0 {
		WhereQuery = " AND " + WhereQuery
		filter.WhereQuery = WhereQuery
	}

}

// GetQuery returns dynamically genrated query.
func GetQuery(queryName string, filter Filter) string {

	query, err := db.Queries.Raw(queryName)
	if err != nil {
		log.Panic("Query not found.")
	}

	dynamicQuery := strings.Replace(query, "{DYNAMICALLY_GENERATED_WHERE_QUERY}", filter.WhereQuery, 1)
	return dynamicQuery

}

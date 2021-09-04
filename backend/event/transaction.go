package event

import (
	"log"
	"time"

	"github.com/ketanip/analytics/db"
)

var (

	// AllEvents stores events in memory for transaction.
	AllEvents []Event
)

// SaveEventsTransaction begins transaction and saves events to database.
func SaveEventsTransaction() {

	var eventsData []Event

	// Getting raw query.
	query, err := db.Queries.Raw("create-event")
	if err != nil {
		log.Println("Failed to load create-event query.")
	}

	// Starting transactions.
	tx, err := db.DB.Begin()
	if err != nil {
		log.Println("Failed to start transaction.")
	}

	// Copying all events to local varible and making global varible nil for next batch.
	eventsData = append(eventsData, AllEvents...)
	AllEvents = nil

	// Executing queries.
	for _, event := range eventsData {

		_, rerr := tx.Exec(query,
			event.VisitorID,
			event.IsBot,
			event.Event,
			event.Time,
			event.Domain,
			event.PageRoute,
			event.Duration,
			event.ScrolledPercentage,
			event.Referrer,
			event.OperatingSystem,
			event.OperatingSystemVersion,
			event.Browser,
			event.BrowserVersion,
			event.UTMSource,
			event.UTMMedium,
			event.UTMCampaign,
			event.CountryCode,
			event.DeviceWidth,
			event.DeviceHeight,
		)

		if rerr != nil {
			log.Println(rerr)
		}

	}

	// Ending Transaction.
	tx.Commit()

	log.Println("Finished transaction.")

}

// RunTransaction runs transaction.
func RunTransaction() {

	for {

		if len(AllEvents) > db.Config.MinimumTransactionCount {

			// Running transcation.
			SaveEventsTransaction()

		}

		// Sleeping to get ready for next batch.
		time.Sleep(time.Millisecond * time.Duration(db.Config.TransactionSleepTime))
	}

}

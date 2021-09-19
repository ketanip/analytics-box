package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/ketanip/analytics/api"
	"github.com/ketanip/analytics/db"
	"github.com/ketanip/analytics/event"
)

func main() {

	// Loading Config
	db.LoadConfig()

	// Create connection with database.
	db.CreateConnection()
	defer db.DB.Close() // Closing database after use.

	// Load GEO IP database.
	db.OpenGeoIPDb()
	defer db.GeoDB.Close()

	// Loading Queries
	db.LoadSQLQueries()

	// Creating tables if they don't exists.
	db.CreateTables()

	// Transaction Goroutine to save events.
	go event.RunTransaction()

	// Initialize Fiber
	app := fiber.New()

	// Add Middleware
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "*",
		AllowHeaders: "*",
		// AllowCredentials: false,
		// ExposeHeaders:    "",
		// MaxAge: 0,
	}))

	// Fiber Route Handling
	FiberRouteHandler(app)

	// Running fiber app on http://localhost:8000 and handling any possible errors.
	if err := app.Listen(":8000"); err != nil {
		panic(err)
	}

}

// FiberRouteHandler handles fiber routing.
func FiberRouteHandler(app *fiber.App) {

	// Route to handle any incoming beacon requests.
	app.Post("/", api.AnalyticsDataHandler)

	// Route to send analytics reports.
	app.Get("/", api.ReportsAPI)

	// I just wanted to test it out.
	app.Get("/dashboard", monitor.New())

}

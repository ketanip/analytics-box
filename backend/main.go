package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/ketanip/analytics/api"
	"github.com/ketanip/analytics/db"
)

func main() {

	// Loading Config
	db.LoadConfig()

	// Create connection with database.
	db.CreateConnection()
	defer db.DB.Close() // Closing database after use.

	// Loading Redis
	db.CreateRedisClient()
	defer db.RedisDB.Close()

	// Load GEO IP database.
	db.OpenGeoIPDb()
	defer db.GeoDB.Close()

	// Loading Queries
	db.LoadSQLQueries()

	// Creating tables if they don't exists.
	db.CreateTables()

	// Initsilize Fiber
	app := fiber.New()

	// Add Middleware
	app.Use(logger.New())

	// Fiber Route Handling
	FiberRouteHandler(app)

	// Running fiber app on http://localhost:3000 and handling any possible errors.
	if err := app.Listen(":3000"); err != nil {
		panic(err)
	}

}

// FiberRouteHandler handles fiber routing.
func FiberRouteHandler(app *fiber.App) {

	// Route to handle any incoming beacon requests.
	app.Post("/", api.AnalyticsDataHandler)

}

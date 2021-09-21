package api

// Payload from beacon.
type Payload struct {
	Data string `form:"data"`
}

// PayloadData struct is payload type from the tracking script.
type PayloadData struct {
	Event              string `json:"event"`
	SessionID          string `json:"session_id"`
	Domain             string `json:"domain"`
	PageRoute          string `json:"page_route"`
	Duration           int    `json:"duration"`
	ScrolledPercentage int    `json:"scrolled_percentage"`
	Referrer           string `json:"referrer"`

	UTMSource   string `json:"utm_source"`
	UTMMedium   string `json:"utm_medium"`
	UTMCampaign string `json:"utm_campaign"`

	DeviceWidth  int `json:"device_width"`
	DeviceHeight int `json:"device_height"`
}

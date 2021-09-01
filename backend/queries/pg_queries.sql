-- name: create-events-table
CREATE TABLE IF NOT EXISTS "events" (
    id                       BIGSERIAL,
    is_bot                   SMALLINT     DEFAULT 0,
    visitor_id               VARCHAR(36)  NOT NULL,
    event                    VARCHAR(36)  NOT NULL,
    time                     TIMESTAMPTZ  NOT NULL,
    domain                   VARCHAR(500) NOT NULL,
    page_route               VARCHAR(500) NOT NULL,
    duration                 INT          NOT NULL,
    scrolled_percentage      INT          NOT NULL,
    referrer                 VARCHAR(250), 
    operating_system         VARCHAR(250),
    operating_system_version INT,
    browser                  VARCHAR(100),
    browser_version          INT,
    utm_source               VARCHAR(300),
    utm_medium               VARCHAR(300),
    utm_campaign             VARCHAR(300),
    country_code             CHAR(2),
    device_width             INT,
    device_height            INT,

    PRIMARY KEY (id)
);


-- name: create-event
INSERT INTO "events" (
    visitor_id, is_bot, event, time, domain, page_route, duration, scrolled_percentage, referrer,  operating_system, operating_system_version, browser, browser_version, utm_source, utm_medium, utm_campaign, country_code, device_width, device_height
)
VALUES (
    :visitor_id, :is_bot, :event, :time, :domain, :page_route, :duration, :scrolled_percentage, :referrer,  :operating_system, :operating_system_version, :browser, :browser_version, :utm_source, :utm_medium, :utm_campaign, :country_code, :device_width, :device_height
);
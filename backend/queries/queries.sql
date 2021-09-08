-- name: create-events-table
CREATE TABLE IF NOT EXISTS "events" (
    id                  UInt64,
    is_bot              UInt8,
    visitor_id          UUID,
    event               String,
    time                DateTime,
    domain              String,
    page_route          String,
    duration            UInt16,
    scrolled_percentage UInt8,
    referrer            String,
    operating_system    String,
    operating_system_version UInt8,
    browser             String,
    browser_version     UInt8,
    utm_source          String,
    utm_medium          String,
    utm_campaign        String,
    country_code        FixedString(2),
    device_width        UInt16,
    device_height       UInt16,
    PRIMARY KEY (id)
)ENGINE = MergeTree();



-- name: create-event
INSERT INTO "events" (
        visitor_id,
        is_bot,
        event,
        time,
        domain,
        page_route,
        duration,
        scrolled_percentage,
        referrer,
        operating_system,
        operating_system_version,
        browser,
        browser_version,
        utm_source,
        utm_medium,
        utm_campaign,
        country_code,
        device_width,
        device_height
    )
VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    );
-- name: create-events-table
CREATE TABLE IF NOT EXISTS "events" (
    id                       BIGSERIAL,
    is_bot                   BOOLEAN       NOT NULL,
    session_id               UUID          NOT NULL,
    event                    VARCHAR(100)  NOT NULL,
    time                     TIMESTAMP     NOT NULL,
    domain                   VARCHAR(253)  NOT NULL,
    page_route               VARCHAR(500)  NOT NULL,
    duration                 INTEGER,
    scrolled_percentage      SMALLINT,
    referrer                 VARCHAR(253),
    operating_system         VARCHAR(500),
    operating_system_version SMALLINT,
    browser                  VARCHAR(500),
    browser_version          SMALLINT,
    utm_source               VARCHAR(500),
    utm_medium               VARCHAR(500),
    utm_campaign             VARCHAR(500),
    country_code             VARCHAR(2),
    device_width             SMALLINT,
    device_height            SMALLINT,
    PRIMARY KEY (id)
);



-- name: create-event
INSERT INTO "events" (
        is_bot,
        session_id,
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
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15,
        $16,
        $17,
        $18,
        $19
);
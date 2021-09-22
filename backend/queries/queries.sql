-- name: create-events-table
CREATE TABLE IF NOT EXISTS "events" (
    id                       BIGSERIAL,
    is_bot                   BOOLEAN       NOT NULL,
    session_id               VARCHAR(21)   NOT NULL,
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


-- name: get-overview-analysis
SELECT
    COUNT(DISTINCT(session_id)) AS unqiue_sessions,
    COUNT(session_id) AS total_sessions,
    AVG(duration) AS average_duration
FROM events
WHERE
    event=:event
    AND domain=:domain
    AND time>=:start_date
    AND time<=:end_date
    {DYNAMICALLY_GENERATED_WHERE_QUERY};

-- name: get-event-analysis
SELECT
    COUNT(DISTINCT(session_id)) AS unqiue_sessions,
    COUNT(session_id) AS total_sessions,
    AVG(duration) AS average_duration,
    date(time) as value
FROM "events"
WHERE 
    event=:event
    AND domain=:domain
    AND time>=:start_date
    AND time<=:end_date
    {DYNAMICALLY_GENERATED_WHERE_QUERY}
GROUP BY value;


-- name: get-referer-analysis
SELECT
    COUNT(DISTINCT(session_id)) AS unqiue_sessions,
    COUNT(session_id) AS total_sessions,
    AVG(duration) AS average_duration,
    referrer as value
FROM "events"
WHERE 
    event=:event
    AND domain=:domain
    AND time>=:start_date
    AND time<=:end_date
    {DYNAMICALLY_GENERATED_WHERE_QUERY}
GROUP BY value;


-- name: get-os-analysis
SELECT
    COUNT(DISTINCT(session_id)) AS unqiue_sessions,
    COUNT(session_id) AS total_sessions,
    AVG(duration) AS average_duration,
    operating_system as value
FROM "events"
WHERE 
    event=:event
    AND domain=:domain
    AND time>=:start_date
    AND time<=:end_date
    {DYNAMICALLY_GENERATED_WHERE_QUERY}
GROUP BY value;


-- name: get-browser-analysis
SELECT
    COUNT(DISTINCT(session_id)) AS unqiue_sessions,
    COUNT(session_id) AS total_sessions,
    AVG(duration) AS average_duration,
    browser as value
FROM "events"
WHERE 
    event=:event
    AND domain=:domain
    AND time>=:start_date
    AND time<=:end_date
    {DYNAMICALLY_GENERATED_WHERE_QUERY}
GROUP BY value;


-- name: get-country-analysis
SELECT
    COUNT(DISTINCT(session_id)) AS unqiue_sessions,
    COUNT(session_id) AS total_sessions,
    AVG(duration) AS average_duration,
    country_code as value
FROM "events"
WHERE 
    event=:event
    AND domain=:domain
    AND time>=:start_date
    AND time<=:end_date
    {DYNAMICALLY_GENERATED_WHERE_QUERY}
GROUP BY value;


-- name: get-page-view-analysis
SELECT
    COUNT(DISTINCT(session_id)) AS unqiue_sessions,
    COUNT(session_id) AS total_sessions,
    AVG(duration) AS average_duration,
    page_route as value
FROM "events"
WHERE 
    event=:event
    AND domain=:domain
    AND time>=:start_date
    AND time<=:end_date
    {DYNAMICALLY_GENERATED_WHERE_QUERY}
GROUP BY value;


-- name: get-utm-source-analysis
SELECT
    COUNT(DISTINCT(session_id)) AS unqiue_sessions,
    COUNT(session_id) AS total_sessions,
    AVG(duration) AS average_duration,
    utm_source as value
FROM "events"
WHERE 
    event=:event
    AND domain=:domain
    AND time>=:start_date
    AND time<=:end_date
    {DYNAMICALLY_GENERATED_WHERE_QUERY}
GROUP BY value;

-- name: get-utm-medium-analysis
SELECT
    COUNT(DISTINCT(session_id)) AS unqiue_sessions,
    COUNT(session_id) AS total_sessions,
    AVG(duration) AS average_duration,
    utm_medium as value
FROM "events"
WHERE 
    event=:event
    AND domain=:domain
    AND time>=:start_date
    AND time<=:end_date
    {DYNAMICALLY_GENERATED_WHERE_QUERY}
GROUP BY value;

-- name: get-utm-campaign-analysis
SELECT
    COUNT(DISTINCT(session_id)) AS unqiue_sessions,
    COUNT(session_id) AS total_sessions,
    AVG(duration) AS average_duration,
    utm_campaign as value
FROM "events"
WHERE 
    event=:event
    AND domain=:domain
    AND time>=:start_date
    AND time<=:end_date
    {DYNAMICALLY_GENERATED_WHERE_QUERY}
GROUP BY value;
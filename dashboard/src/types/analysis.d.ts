// Filter
type response = {
    domain: string;
    event: string;

    start_date: Date;
    end_date: Date;

    page_route: string;
    referer: string;
    browser: string;
    operating_system: string;
    country_code: string;

    data: report;
}

// type filter
type filter = {
    domain: string;
    event: string;

    start_date: Date;
    end_date: Date;

    page_route: string;
    referer: string;
    browser: string;
    operating_system: string;
    country_code: string;

};

// Report
type report = {
    overview: overviewAnalysis;
    analysis: baseAnalysis[];
    referers: baseAnalysis[];
    operating_systems: baseAnalysis[];
    browsers: baseAnalysis[];
    page_views: baseAnalysis[];
    countries: baseAnalysis[];
    utm_medium: baseAnalysis[];
    utm_sources: baseAnalysis[];
    utm_campaigns: baseAnalysis[];
}

// BaseAnalysis
type baseAnalysis = {
    value: string;
    total_sessions: int;
    unique_sessions: int;
    duration_seconds: float32;
}

// OverviewAnalysis
type overviewAnalysis = {
    total_sessions: int;
    unique_sessions: int;
    average_duration: float32;
}

export {
    response,
    report,
    filter,
    baseAnalysis,
    overviewAnalysis,
};
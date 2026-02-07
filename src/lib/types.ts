export interface ZutrixProject {
    id: string;
    name: string;
    domain: string;
    tags: string[];
    features: {
        rank_tracking: boolean;
        backlinks: boolean;
        competitors: boolean;
        ai_visibility: boolean;
    };
    created_at: string;
}

export interface ZutrixKeyword {
    id: string;
    keyword: string;
    tags: string[];
    location: string;
    language: string;
    device: string;
    current_position: number | null;
    current_position_group: number | null;
    ranked_url: string | null;
    first_position: number | null;
    search_volume: number | null;
    cpc: number | null;
    competition_index: number | null;
    last_tracked_at: string | null;
}

export interface ZutrixKeywordHistory {
    date: string;
    position: number | null;
    position_group: number | null;
    url: string | null;
}

export interface ZutrixCompetitorData {
    competitor_domains: string[];
    keyword_gaps: Array<{
        competitor: string;
        date: string;
        total_gaps: number;
    }>;
    backlink_gaps: Array<{
        competitors: string[];
        date: string;
        total_gaps: number;
    }>;
}

export interface ZutrixBacklink {
    url_from: string;
    url_to: string;
    domain_from: string;
    anchor: string;
    first_seen: string;
    last_seen: string;
    is_new: boolean;
    is_lost: boolean;
    is_broken: boolean;
    page_from_rank: number;
    domain_from_rank: number;
}

export interface ZutrixKeywordSuggestion {
    keyword: string;
    search_volume: number;
    cpc: number;
    competition_level: string | null;
    competition_index: number;
    keyword_difficulty: number;
    search_intent: string | null;
    monthly_searches: Array<{ year: number; month: number; search_volume: number }>;
}

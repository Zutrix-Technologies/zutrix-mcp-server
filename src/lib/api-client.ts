const rawBase = process.env.ZUTRIX_API_BASE || 'https://zutrix.com';
if (rawBase && !rawBase.startsWith('https://')) {
    throw new Error('ZUTRIX_API_BASE must use HTTPS to protect your API key in transit');
}
const API_BASE = rawBase.replace(/\/+$/, '');
const API_KEY = process.env.ZUTRIX_API_KEY || '';

interface RequestOptions {
    method?: 'GET' | 'POST';
    params?: Record<string, string | number | undefined>;
    body?: Record<string, unknown>;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', params, body } = options;

    if (!API_KEY) {
        throw new Error('ZUTRIX_API_KEY environment variable is not set. Get your API key from https://zutrix.com/dashboard/settings');
    }

    let url = `${API_BASE}/api/mcp${path}`;

    if (params) {
        const searchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined) {
                searchParams.set(key, String(value));
            }
        }
        const qs = searchParams.toString();
        if (qs) url += `?${qs}`;
    }

    const headers: Record<string, string> = {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'zutrix-mcp-server/1.0.0'
    };

    const fetchOptions: RequestInit = { method, headers };

    if (body && method === 'POST') {
        fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorBody = await response.text();
        let errorMessage: string;
        try {
            const parsed = JSON.parse(errorBody);
            errorMessage = parsed.error || parsed.message || errorBody;
        } catch {
            errorMessage = errorBody;
        }
        throw new Error(`Zutrix API error (${response.status}): ${errorMessage}`);
    }

    return response.json() as Promise<T>;
}

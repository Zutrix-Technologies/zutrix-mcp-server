import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../lib/api-client.js';

export function registerKeywordsTools(server: McpServer) {
    server.tool(
        'get_project_keywords',
        'Get tracked keywords with their current rankings for a project',
        {
            project_id: z.string().regex(/^[a-f0-9]{24}$/).describe('The project ID'),
            page: z.number().int().min(1).optional().describe('Page number (default: 1)'),
            limit: z.number().int().min(1).max(500).optional().describe('Results per page, max 500 (default: 100)')
        },
        async ({ project_id, page, limit }) => {
            const data = await apiRequest<any>(`/projects/${project_id}/keywords`, {
                params: { page, limit }
            });
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(data, null, 2)
                }]
            };
        }
    );

    server.tool(
        'get_keyword_history',
        'Get ranking position history over time for a specific tracked keyword',
        {
            keyword_id: z.string().regex(/^[a-f0-9]{24}$/).describe('The tracked keyword ID'),
            days: z.number().int().min(1).max(365).optional().describe('Number of days of history, max 365 (default: 30)')
        },
        async ({ keyword_id, days }) => {
            const data = await apiRequest<any>(`/keywords/${keyword_id}/history`, {
                params: { days }
            });
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(data, null, 2)
                }]
            };
        }
    );

    server.tool(
        'get_keyword_suggestions',
        'Get keyword ideas and metrics for a seed keyword (uses planner credits)',
        {
            keyword: z.string().min(1).max(200).describe('Seed keyword to get suggestions for'),
            country: z.string().optional().describe('Country ISO code or name, e.g. "US" or "United States" (default: US)'),
            language: z.string().optional().describe('Language code or name, e.g. "en" or "English" (default: English)')
        },
        async ({ keyword, country, language }) => {
            const data = await apiRequest<any>('/keywords/suggestions', {
                method: 'POST',
                body: { keyword, country, language }
            });
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(data, null, 2)
                }]
            };
        }
    );
}

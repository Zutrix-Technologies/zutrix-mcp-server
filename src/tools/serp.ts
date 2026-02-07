import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../lib/api-client.js';

export function registerSerpTools(server: McpServer) {
    server.tool(
        'get_serp_results',
        'Get SERP (Search Engine Results Page) data for a tracked keyword in a project.',
        {
            project_id: z.string().regex(/^[a-f0-9]{24}$/).describe('The project ID that tracks this keyword'),
            keyword: z.string().min(1).max(200).describe('The keyword to get SERP results for'),
            country: z.string().optional().describe('Country ISO code or name, e.g. "US" or "United States" (default: US)'),
            language: z.string().optional().describe('Language code or name, e.g. "en" or "English" (default: English)'),
            device: z.enum(['desktop', 'mobile']).optional().describe('Device type (default: desktop)')
        },
        async ({ project_id, keyword, country, language, device }) => {
            const data = await apiRequest<any>('/serp', {
                params: { project_id, keyword, country, language, device }
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

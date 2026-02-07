import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../lib/api-client.js';

export function registerExplorerTools(server: McpServer) {
    server.tool(
        'get_domain_overview',
        'Get comprehensive domain metrics including organic traffic, backlinks summary, and domain rank. Uses explorer credits.',
        {
            domain: z.string().describe('Domain to analyze (e.g. "example.com")'),
            country: z.string().optional().describe('Country ISO code or name, e.g. "US" or "United States" (default: US)'),
            language: z.string().optional().describe('Language code or name, e.g. "en" or "English" (default: English)')
        },
        async ({ domain, country, language }) => {
            const data = await apiRequest<any>('/explorer/domain', {
                params: { domain, country, language }
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

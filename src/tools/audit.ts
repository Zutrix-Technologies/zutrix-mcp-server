import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../lib/api-client.js';

export function registerAuditTools(server: McpServer) {
    server.tool(
        'get_site_audit',
        'Run a technical SEO audit on a URL. Returns page performance, meta tags, headings, images, links, and more. Uses audit credits.',
        {
            url: z.string().url().refine(u => u.startsWith('http://') || u.startsWith('https://'), { message: 'URL must start with http:// or https://' }).describe('Full URL to audit')
        },
        async ({ url }) => {
            const data = await apiRequest<any>('/audit', {
                params: { url }
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

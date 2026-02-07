import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../lib/api-client.js';

export function registerBacklinksTools(server: McpServer) {
    server.tool(
        'get_backlinks',
        'Get backlink profile data including new, lost, and broken links for a project',
        {
            project_id: z.string().regex(/^[a-f0-9]{24}$/).describe('The project ID'),
            limit: z.number().int().min(1).max(1000).optional().describe('Maximum number of backlinks to return, max 1000 (default: 100)')
        },
        async ({ project_id, limit }) => {
            const data = await apiRequest<any>(`/projects/${project_id}/backlinks`, {
                params: { limit }
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

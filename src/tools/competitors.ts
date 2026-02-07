import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../lib/api-client.js';

export function registerCompetitorsTools(server: McpServer) {
    server.tool(
        'get_competitors',
        'Get competitor domains and keyword/backlink gap analysis for a project',
        {
            project_id: z.string().regex(/^[a-f0-9]{24}$/).describe('The project ID')
        },
        async ({ project_id }) => {
            const data = await apiRequest<any>(`/projects/${project_id}/competitors`);
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(data, null, 2)
                }]
            };
        }
    );
}

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../lib/api-client.js';

export function registerVisibilityTools(server: McpServer) {
    server.tool(
        'get_ai_visibility',
        'Get AI search visibility data showing how your brand appears in AI-generated responses across models like ChatGPT, Claude, Gemini, and others',
        {
            project_id: z.string().regex(/^[a-f0-9]{24}$/).describe('The project ID')
        },
        async ({ project_id }) => {
            const data = await apiRequest<any>(`/projects/${project_id}/ai-visibility`);
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(data, null, 2)
                }]
            };
        }
    );
}

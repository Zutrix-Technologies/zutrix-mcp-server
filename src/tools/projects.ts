import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { apiRequest } from '../lib/api-client.js';
import { ZutrixProject } from '../lib/types.js';

export function registerProjectsTools(server: McpServer) {
    server.tool(
        'get_projects',
        'List all your Zutrix SEO projects with their enabled features',
        {},
        async () => {
            const data = await apiRequest<{ projects: ZutrixProject[] }>('/projects');
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(data.projects, null, 2)
                }]
            };
        }
    );
}

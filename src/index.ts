#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerProjectsTools } from './tools/projects.js';
import { registerKeywordsTools } from './tools/keywords.js';
import { registerSerpTools } from './tools/serp.js';
import { registerCompetitorsTools } from './tools/competitors.js';
import { registerBacklinksTools } from './tools/backlinks.js';
import { registerAuditTools } from './tools/audit.js';
import { registerExplorerTools } from './tools/explorer.js';
import { registerVisibilityTools } from './tools/visibility.js';

const server = new McpServer({
    name: 'Zutrix SEO',
    version: '1.0.0'
});

// Register all tools
registerProjectsTools(server);
registerKeywordsTools(server);
registerSerpTools(server);
registerCompetitorsTools(server);
registerBacklinksTools(server);
registerAuditTools(server);
registerExplorerTools(server);
registerVisibilityTools(server);

// Start server with stdio transport
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch((error) => {
    console.error('Failed to start Zutrix MCP server:', error);
    process.exit(1);
});

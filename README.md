# Zutrix MCP Server

Connect your AI tools to [Zutrix](https://zutrix.com) SEO data using the Model Context Protocol (MCP).

## Available Tools

| Tool | Description |
|------|-------------|
| `get_projects` | List all your SEO projects |
| `get_project_keywords` | Get tracked keywords with current rankings |
| `get_keyword_history` | Get ranking position history over time |
| `get_keyword_suggestions` | Get keyword ideas and metrics |
| `get_serp_results` | Get SERP data for a keyword |
| `get_competitors` | Get competitor analysis and keyword gaps |
| `get_backlinks` | Get backlink profile data |
| `get_site_audit` | Run a technical SEO page audit |
| `get_domain_overview` | Get comprehensive domain metrics |
| `get_ai_visibility` | Get AI search visibility data |

## Setup

### 1. Get Your API Key

Go to [Zutrix Settings](https://zutrix.com/dashboard/settings) and generate an API key.

### 2. Install

```bash
npm install -g zutrix-mcp-server
```

### 3. Configure Your AI Tool

#### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "zutrix": {
      "command": "npx",
      "args": ["-y", "zutrix-mcp-server"],
      "env": {
        "ZUTRIX_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

#### Cursor

Add to `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "zutrix": {
      "command": "npx",
      "args": ["-y", "zutrix-mcp-server"],
      "env": {
        "ZUTRIX_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

#### VS Code

Add to your VS Code settings (`.vscode/mcp.json`):

```json
{
  "servers": {
    "zutrix": {
      "command": "npx",
      "args": ["-y", "zutrix-mcp-server"],
      "env": {
        "ZUTRIX_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ZUTRIX_API_KEY` | Yes | - | Your Zutrix API key |
| `ZUTRIX_API_BASE` | No | `https://zutrix.com` | API base URL (for development) |

## Example Prompts

Once configured, you can ask your AI tool questions like:

- "Show me all my Zutrix projects"
- "What are the top keywords for my project?"
- "How has the ranking for 'best seo tool' changed over the last 30 days?"
- "Run an SEO audit on https://example.com"
- "What are my competitors doing better than me?"
- "Find keyword opportunities related to 'email marketing'"
- "Show me my backlink profile"
- "How visible is my brand in AI search results?"

## License

MIT

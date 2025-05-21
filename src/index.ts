import { init, server } from "phoebe-ebird-mcp/server";
import Phoebe from "phoebe-ebird";
import { McpAgent } from "agents/mcp";

export class MyMCP extends McpAgent {
  server = server; // set the server on the class instance

  async init() {
    // Instantiate your client with the values from the worker environment
    const client = new Phoebe({
      apiKey: this.env.EBIRD_API_KEY,
    });

    // Initialize all the generated endpoints with the server
    init({ server: this.server, client });
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === "/sse" || url.pathname === "/sse/message") {
      return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
    }

    if (url.pathname === "/mcp") {
      return MyMCP.serve("/mcp").fetch(request, env, ctx);
    }

    return new Response("Not found", { status: 404 });
  },
};

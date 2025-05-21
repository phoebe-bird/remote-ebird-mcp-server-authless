import { init, server } from "phoebe-ebird-mcp/server";
import MyStainlessClient from "phoebe-ebird";
import { McpAgent } from "agents/mcp";

export class MyMCP extends McpAgent {
  server = server; // set the server on the class instance

  async init() {
    // Instantiate your client with the values from the worker environment
    const client = new MyStainlessClient({
      apiKey: process.env.EBIRD_API_KEY,
    });

    // Initialize all the generated endpoints with the server
    init({ server: this.server, client });
  }
}

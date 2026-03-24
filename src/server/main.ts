import { EnvSchema } from "./env";
import { OpenAPIHandler } from "@orpc/openapi/fetch"; // or '@orpc/server/node'
import { createRouter } from "@/server/router";

const env = EnvSchema.parse(process.env);
const router = createRouter(env);
const handler = new OpenAPIHandler(router);

export default {
  fetch: async (request: Request) => {
    const { matched, response } = await handler.handle(request, { prefix: "/server" });
    if (matched) return response;
    else return new Response("Not Found", { status: 404 });
  },
};

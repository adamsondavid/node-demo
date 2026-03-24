import type { JsonifiedClient } from "@orpc/openapi-client";
import type { ContractRouterClient } from "@orpc/contract";
import { createORPCClient } from "@orpc/client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { contract } from "@/common/contract";

const link = new OpenAPILink(contract, { url: `${window.location.origin}/server` });
const client: JsonifiedClient<ContractRouterClient<typeof contract>> = createORPCClient(link);
export const useServer = () => client;

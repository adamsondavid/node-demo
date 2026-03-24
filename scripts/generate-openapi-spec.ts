import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { contract } from "@/common/contract";
import { writeFileSync } from "node:fs";

const openAPIGenerator = new OpenAPIGenerator({ schemaConverters: [new ZodToJsonSchemaConverter()] });

const openApiSpec = await openAPIGenerator.generate(contract, {
  info: {
    title: "My App",
    version: "0.0.0",
  },
  servers: [{ url: "https://api.example.com/v1" }],
});

writeFileSync(".output/contract.json", JSON.stringify(openApiSpec, null, 2));

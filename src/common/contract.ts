import { oc } from "@orpc/contract";
import * as z from "zod";

export const getUsersByUserName = oc
  .route({ method: "GET", path: "/users/{name}" })
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .output(
    z.array(
      z.object({
        id: z.uuid(),
        name: z.string(),
        email: z.email(),
        age: z.number(),
      }),
    ),
  );

export const contract = {
  users: {
    getByUserName: getUsersByUserName,
  },
};

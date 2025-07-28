import { agentsRouter } from "@/procedures/agent";
import { meetingsRouter } from "@/procedures/meeting";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
});

export type AppRouter = typeof appRouter;

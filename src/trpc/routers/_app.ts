import { agentsRouter } from "@/procedures/agent";
import { meetingsRouter } from "@/procedures/meeting";
import { premiumRouter } from "@/procedures/premium";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
  premium: premiumRouter,
});

export type AppRouter = typeof appRouter;

import db from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { z } from "zod";
import { agentsInsertSchema } from "./schemas";

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);

    return data;
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          mettingCount: sql<number>`5`,
        })
        .from(agents)
        .where(eq(agents.id, input.id));

      return existingAgent;
    }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({ ...input, userId: ctx.auth.user.id })
        .returning();

      return createdAgent;
    }),
});

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import z from "zod";

export const boardRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const boards = await ctx.db.board.findMany({
      where: {
        isClosed: false,
        createdBy: {
          id: ctx.session.user.id,
        },
      },
    });

    return boards ?? null;
  }),

  add: protectedProcedure
    .input(z.object({ boardTitle: z.string().min(2).max(50) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.board.create({
        data: {
          name: input.boardTitle,
          createdBy: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ boardId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.board.update({
        where: { id: input.boardId },
        data: {
          isClosed: true,
          updatedAt: new Date(),
        },
      });
    }),
});

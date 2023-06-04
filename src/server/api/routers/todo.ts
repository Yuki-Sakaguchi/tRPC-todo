import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import { procedure, router } from "@/server/trpc";
import { createInput, updateInput } from "@/server/types/todo";

const prisma = new PrismaClient();

export const todoRouter = router({
  /**
   * Todoを全件取得
   */
  getTodos: procedure.query(async () => {
    const todos = await prisma.todo.findMany();
    return todos;
  }),

  /**
   * idを指定したTodoを取得
   */
  getTodoById: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const todo = await prisma.todo.findUnique({
        where: { id: input.id },
      });
      if (!todo) {
        throw new Error("Todo not found");
      }
      return todo;
    }),

  /**
   * 新しいTodoを登録する
   */
  createTodo: procedure.input(createInput).mutation(async ({ input }) => {
    const todo = await prisma.todo.create({
      data: {
        title: input.title,
        body: input.body,
      },
    });
    return todo;
  }),

  /**
   * 既存のTodoを更新する
   */
  updateTodo: procedure.input(updateInput).mutation(async ({ input }) => {
    const { id, title, body } = input;
    const todo = await prisma.todo.update({
      where: { id },
      data: { title, body },
    });
    return todo;
  }),

  /**
   * 既存のTodoを削除する
   */
  deleteTodo: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.todo.delete({
        where: { id: input.id },
      });
    }),
});

import { router } from "@/server/trpc";
import { helloRouter } from "./hello";
import { todoRouter } from "./todo";

// メインのルーターに hello ルーターを追加
export const appRouter = router({
  hello: helloRouter,
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;

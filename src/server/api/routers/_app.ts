import { router } from "@/server/trpc";
import { helloRouter } from "./hello";

// メインのルーターに hello ルーターを追加
export const appRouter = router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;

import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/server/api/routers/_app";

// APIハンドラをエクスポート
// 詳細は https://trpc.io/docs/server/adapters を参照
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

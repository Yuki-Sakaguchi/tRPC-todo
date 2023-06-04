import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "@/server/api/routers/_app";

function getBaseUrl() {
  // ブラウザの場合は相対パスを使用
  if (typeof window !== "undefined") {
    return "";
  }

  // vercel の場合
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Render の場合
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `https://${process.env.RENDERINTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // 上記に該当しない場合は localhost とする
  return `https://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    };
  },
  ssr: false,
});

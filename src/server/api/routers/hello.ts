import { z } from "zod";
import { procedure, router } from "@/server/trpc";

export const helloRouter = router({
  /**
   * テキストを受け取って連結した結果を返すAPI
   */
  getHello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

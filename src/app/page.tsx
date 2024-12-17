import { HydrateClient } from "@/trpc/server";
import SafeSuspense from "./_components/SafeSuspense";
import GA from "./_components/GA";
import Game from "./_components/game/Game";

export default async function Home() {
  return (
    <HydrateClient>
      <SafeSuspense>
        <h1
          className="mb-6 text-2xl font-bold"
          style={{
            WebkitUserSelect: "none" /* Safari */,
            userSelect: "none",
          }}
        >
          1/2をひたすら当てていき
          <br />
          ベスト記録を目指す
          <br />
          ブラウザゲーム
        </h1>
        <Game />
        <GA />
      </SafeSuspense>
    </HydrateClient>
  );
}

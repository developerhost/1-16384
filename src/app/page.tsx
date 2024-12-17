import { HydrateClient } from "@/trpc/server";
import SafeSuspense from "./_components/SafeSuspense";
import GA from "./_components/GA";
import Game from "./_components/game/Game";

export default async function Home() {
  return (
    <HydrateClient>
      <SafeSuspense>
        <Game />
        <GA />
      </SafeSuspense>
    </HydrateClient>
  );
}

import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <p className="text-center text-muted-foreground">
        {JSON.stringify(session)}
      </p>
    </main>
  );
}

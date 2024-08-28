import { getServerAuthSession } from "~/server/auth";
import { LogoutButton } from "./_components/logout-button";
import { LoginButton } from "./_components/login-button";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <p className="text-muted-foreground text-center">{JSON.stringify(session)}</p>
      {session ? <LogoutButton /> : <LoginButton />}
    </main>
  );
}

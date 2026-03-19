import { auth } from "@/auth/auth";
import SignOutButton from "@/components/signOut";

export default async function Home() {
  // const session = await auth()

  return (
    <>
      <div>
        <SignOutButton />

      </div>
    </>

  );
}

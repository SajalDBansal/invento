import { auth } from "@/auth/auth";
import SignOutButton from "@/components/signOut";

export default async function Home() {
  const session = await auth()
  console.log(session);


  return (
    <>
      <div>
        <SignOutButton />

      </div>
    </>

  );
}

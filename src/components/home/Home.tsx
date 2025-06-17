"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Home = () => {
  const { data } = authClient.useSession();
  const router = useRouter();
  return (
    <div>
      {data?.user.name}
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: { onSuccess: () => router.replace("/sign-in") },
          })
        }
      >
        out
      </Button>
    </div>
  );
};

export default Home;

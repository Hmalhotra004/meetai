import { auth } from "@/lib/auth";
import HomeView from "@/views/HomeView";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Homepage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return <HomeView />;
};

export default Homepage;

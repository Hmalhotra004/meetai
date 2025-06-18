"use client";
import { authClient } from "@/lib/auth-client";

const Home = () => {
  const { data } = authClient.useSession();
  return <div>{data?.user.name}</div>;
};

export default Home;

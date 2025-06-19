"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "balle balle" }));

  return <div>{data?.greeting}</div>;
};

export default Home;

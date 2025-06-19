"use client";
import Loader from "@/components/fallbacks/Loader";
import ServerError from "@/components/fallbacks/ServerError";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const AgentsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      <h1>{JSON.stringify(data, null, 2)}</h1>
    </div>
  );
};

export default AgentsView;

// Fallbacks
export const AgentsViewLoading = () => {
  return (
    <Loader
      title="Loading Agents"
      description="This may take a few seconds"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ServerError
      title="Failed to load Agents"
      description="Please try again"
    />
  );
};

"use client";
import { columns } from "@/components/agents/Columns";
import { DataTable } from "@/components/agents/DataTable";
import EmptyState from "@/components/fallbacks/EmptyState";
import Loader from "@/components/fallbacks/Loader";
import ServerError from "@/components/fallbacks/ServerError";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const AgentsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={data}
      />
      {data.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join meetings. Each agent will follow your instructions."
        />
      )}
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

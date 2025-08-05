"use client";
import { columns } from "@/components/agents/Columns";
import { DataTable } from "@/components/DataTable";
import DataPagination from "@/components/DataPagination";
import EmptyState from "@/components/fallbacks/EmptyState";
import Loader from "@/components/fallbacks/Loader";
import ServerError from "@/components/fallbacks/ServerError";
import { useAgentsFilters } from "@/hooks/useAgentsFilters";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const AgentsView = () => {
  const [filters, setFilters] = useAgentsFilters();

  const trpc = useTRPC();
  const router = useRouter();

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />

      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ ...filters, page })}
      />

      {data.items.length === 0 && (
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

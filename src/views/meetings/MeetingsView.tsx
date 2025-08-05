"use client";

import { DataTable } from "@/components/DataTable";
import EmptyState from "@/components/fallbacks/EmptyState";
import Loader from "@/components/fallbacks/Loader";
import ServerError from "@/components/fallbacks/ServerError";
import { columns } from "@/components/meetings/Columns";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const MeetingsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({ search: "" })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas , interact with participants in real time."
        />
      )}
    </div>
  );
};

export default MeetingsView;

// Fallbacks
export const MeetingsViewLoading = () => {
  return (
    <Loader
      title="Loading Meetings"
      description="This may take a few seconds"
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ServerError
      title="Failed to load Meeting"
      description="Please try again"
    />
  );
};

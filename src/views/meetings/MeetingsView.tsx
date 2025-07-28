"use client";

import Loader from "@/components/fallbacks/Loader";
import ServerError from "@/components/fallbacks/ServerError";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const MeetingsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({ search: "" })
  );

  return <div>{JSON.stringify(data)}</div>;
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

import { getQueryClient, trpc } from "@/trpc/server";
import MeetingsView, {
  MeetingsViewError,
  MeetingsViewLoading,
} from "@/views/meetings/MeetingsView";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const MeetingsPage = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({ search: "" })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewLoading />}>
        <ErrorBoundary fallback={<MeetingsViewError />}>
          <MeetingsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default MeetingsPage;

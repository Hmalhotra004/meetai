import MeetingsListHeader from "@/components/meetings/MeetingsListHeader";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import MeetingsView, {
  MeetingsViewError,
  MeetingsViewLoading,
} from "@/views/meetings/MeetingsView";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const MeetingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({ search: "" })
  );

  return (
    <>
      <MeetingsListHeader />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default MeetingsPage;

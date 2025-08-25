"use client";
import ActiveState from "@/components/fallbacks/ActiveState";
import CancelledState from "@/components/fallbacks/CancelledState";
import CompletedState from "@/components/fallbacks/CompletedState";
import Loader from "@/components/fallbacks/Loader";
import ProcessingState from "@/components/fallbacks/ProcessingState";
import ServerError from "@/components/fallbacks/ServerError";
import UpcomingState from "@/components/fallbacks/UpcomingState";
import MeetingIdViewHeader from "@/components/meetings/MeetingIdViewHeader";
import UpdateMeetingDialog from "@/components/meetings/UpdateMeetingDialog";
import { useConfirm } from "@/hooks/useConfirm";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface MeetingIdViewProps {
  meetingId: string;
}

const MeetingIdView = ({ meetingId }: MeetingIdViewProps) => {
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removedMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({ search: "" })
        );

        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to remove agent");
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove this meeting.`
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removedMeeting.mutateAsync({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isProcessing = data.status === "processing";
  const isCompleted = data.status === "completed";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        initialValues={data}
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
      />

      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onDelete={handleRemoveMeeting}
        />

        {isActive && <ActiveState meetingId={data.id} />}

        {isUpcoming && (
          <UpcomingState
            meetingId={data.id}
            isCanceling={false}
            onCancelMeeting={() => {}}
          />
        )}

        {isCancelled && <CancelledState />}

        {isProcessing && <ProcessingState />}

        {isCompleted && <CompletedState data={data} />}
      </div>
    </>
  );
};

export default MeetingIdView;

// Fallbacks
export const MeetingIdViewLoading = () => {
  return (
    <Loader
      title="Loading Meeting"
      description="This may take a few seconds"
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ServerError
      title="Failed to load Meeting"
      description="Please try again"
    />
  );
};

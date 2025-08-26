"use client";

import { authClient } from "@/lib/auth-client";
import Loader from "../fallbacks/Loader";
import ChatUI from "./ChatUI";

interface Props {
  meetingId: string;
  meetingName: string;
}

const ChatProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return (
      <Loader
        title="Loading..."
        description="Please wait  while we load chat"
      />
    );
  }

  return (
    <ChatUI
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={data.user.image ?? ""}
    />
  );
};

export default ChatProvider;

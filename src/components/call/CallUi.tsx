"use client";
import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import CallActive from "./CallActive";
import CallEnded from "./CallEnded";
import CallLobby from "./CallLobby";

interface Props {
  meetingName: string;
}

const CallUi = ({ meetingName }: Props) => {
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const call = useCall();

  const handleJoin = async () => {
    if (!call) return;

    await call.join();

    setShow("call");
  };

  const handleLeave = async () => {
    if (!call) return;

    call.endCall();

    setShow("ended");
  };

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && (
        <CallActive
          meetingName={meetingName}
          onLeave={handleLeave}
        />
      )}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};

export default CallUi;

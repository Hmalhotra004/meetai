import { MAX_AGENT_COUNT, MAX_MEETING_COUNT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { RocketIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

const DashboardTrial = () => {
  const trpc = useTRPC();

  const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions());

  if (!data) {
    return null;
  }

  return (
    <div className="border border-border/10 rounded-lg w-full bg-white/5 flex flex-col gap-y-2">
      <div className="p-3 flex flex-col gap-y-4">
        <div className="flex items-center gap-2">
          <RocketIcon className="size-4" />
          <p className="text-sm font-medium">Free Trial</p>
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="text-sm">
            {data.agentCount}/{MAX_AGENT_COUNT} agents
          </p>
          <Progress value={(data.agentCount / MAX_AGENT_COUNT) * 100} />
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="text-sm">
            {data.meetingCount}/{MAX_MEETING_COUNT} meetings
          </p>
          <Progress value={(data.meetingCount / MAX_MEETING_COUNT) * 100} />
        </div>
      </div>
      <Button
        className="bg-transparent border-t border-border/10 hover:bg-white/10 rounded-t-none"
        asChild
      >
        <Link href={`/upgrade`}>Upgrade</Link>
      </Button>
    </div>
  );
};

export default DashboardTrial;

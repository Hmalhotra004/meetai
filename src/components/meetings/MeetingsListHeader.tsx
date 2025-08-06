"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";
import { useMeetingsFilters } from "@/hooks/useMeetingsFilters";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import AgentIdFilter from "./AgentIdFilter";
import MeetingsSearchFilter from "./MeetingsSearchFilter";
import MeetingStatusFilter from "./MeetingStatusFilter";
import NewMeetingDialog from "./NewMeetingDialog";

const MeetingsListHeader = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useMeetingsFilters();

  const isAnyFilterModified =
    !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({ search: "", page: DEFAULT_PAGE, agentId: "", status: null });
  };

  return (
    <>
      <NewMeetingDialog
        open={open}
        onOpenChange={setOpen}
      />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>

        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilter />
            <MeetingStatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
              >
                <XCircleIcon />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default MeetingsListHeader;

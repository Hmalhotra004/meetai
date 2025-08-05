"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import NewMeetingDialog from "./NewMeetingDialog";

const MeetingsListHeader = () => {
  const [open, setOpen] = useState(false);
  // const [filters, setFilters] = useAgentsFilters();

  // const isAnyFilterModified = !!filters.search;

  // const onClearFilters = () => {
  //   setFilters({ search: "", page: DEFAULT_PAGE });
  // };

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

        <div className="flex items-center gap-x-2 p-1">
          {/* <AgentsSearchFilter /> */}
          {/* {isAnyFilterModified && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
            >
              <XCircleIcon />
              Clear
            </Button>
          )} */}
        </div>
      </div>
    </>
  );
};

export default MeetingsListHeader;

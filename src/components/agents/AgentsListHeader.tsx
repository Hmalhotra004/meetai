"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import NewAgentDialog from "./NewAgentDialog";

const AgentsListHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NewAgentDialog
        open={open}
        onOpenChange={setOpen}
      />

      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
      </div>
    </>
  );
};

export default AgentsListHeader;

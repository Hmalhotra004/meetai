"use client";

import GeneratedAvatar from "@/components/GeneratedAvatar";
import { Badge } from "@/components/ui/badge";
import { AgentGetMany } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CornerDownRight, Video } from "lucide-react";

export const columns: ColumnDef<AgentGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.name}
            className="size-6"
          />
          <span className="font-semibold capitalize">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <CornerDownRight className="size-3 text-muted-foreground" />
          <span className="text-sm text-muted-foreground max-w-[200xp] truncate capitalize">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center gap-x-2 [$>svg]:size-4"
      >
        <Video className="text-blue-700" />
        {row.original.meetingCount}{" "}
        {row.original.meetingCount === 1 ? "Meeting" : "Meetings"}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GeneratedAvatarUri } from "@/lib/avatar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import Loader from "../fallbacks/Loader";

interface Props {
  meetingId: string;
}

const Transcript = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(
    trpc.meetings.getTranscript.queryOptions({ id: meetingId })
  );

  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = (data ?? []).filter((item) =>
    item.text.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg border px-4 py-5 flex flex-col gap-y-4 w-full">
      <p className="text-sm font-medium">Transcript</p>

      <div className="relative">
        <Input
          placeholder="Search Transcript"
          className="pl-7 h-9 w-[240]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      </div>

      {isLoading ? (
        <Loader
          title="Loading Transcript"
          description="This may take a few seconds"
        />
      ) : data && data?.length > 0 ? (
        <ScrollArea>
          <div className="flex flex-col gap-y-4">
            {filteredData.map((item) => {
              return (
                <div
                  key={item.start_ts}
                  className="flex flex-col gap-y-2 hover:bg-muted p-4 rounded-md border"
                >
                  <div className="flex gap-x-2 items-center">
                    <Avatar className="size-6">
                      <AvatarImage
                        src={
                          item.user.image ??
                          GeneratedAvatarUri({
                            seed: item.user.name,
                            variant: "initials",
                          })
                        }
                        alt="user Avatar"
                      />
                    </Avatar>

                    <p className="text-sm font-medium">{item.user.name}</p>
                    <p className="text-sm text-blue-500 font-medium">
                      {format(
                        new Date(0, 0, 0, 0, 0, 0, item.start_ts),
                        "mm:ss"
                      )}
                    </p>
                  </div>

                  <Highlighter
                    className="text-sm text-neutral-700"
                    highlightClassName="bg-yellow-200"
                    searchWords={[searchQuery]}
                    autoEscape={true}
                    textToHighlight={item.text}
                  />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      ) : (
        <h1 className="text-base font-medium">No Transcript available</h1>
      )}
    </div>
  );
};

export default Transcript;

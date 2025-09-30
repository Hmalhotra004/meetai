import GeneratedAvatar from "@/components/GeneratedAvatar";
import Transcript from "@/components/meetings/Transcript";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDuration } from "@/lib/utils";
import { MeetingGetOne } from "@/types";
import { format } from "date-fns";
import Link from "next/link";
import Markdown from "react-markdown";

import {
  BookOpenTextIcon,
  ClockFadingIcon,
  FileTextIcon,
  FileVideoIcon,
  SparklesIcon,
} from "lucide-react";

interface Props {
  data: MeetingGetOne;
}

const tabs = [
  {
    value: "summary",
    icon: BookOpenTextIcon,
    text: "Summary",
  },
  {
    value: "transcript",
    icon: FileTextIcon,
    text: "Transcript",
  },
  {
    value: "recording",
    icon: FileVideoIcon,
    text: "Recording",
  },
  // {
  //   value: "chat",
  //   icon: SparklesIcon,
  //   text: "Ask AI",
  // },
];

const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="bg-white rounded-lg border px-3">
          <ScrollArea>
            <TabsList className="p-0 bg-background justify-start rounded-none h-13">
              {tabs.map((t, idx) => {
                return (
                  <TabsTrigger
                    key={idx}
                    value={t.value}
                    className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                  >
                    <t.icon />
                    {t.text}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* summary */}
        <TabsContent value="summary">
          <ScrollArea className="h-[calc(100vh-215px)] bg-white rounded-lg border">
            <div className="px-4 pt-5 pb-2 gap-y-5 flex flex-col ">
              <h2 className="text-2xl font-medium capitalize">{data.name}</h2>

              <div className="flex gap-x-2 items-center">
                <Link
                  href={`/agents/${data.agentId}`}
                  className="flex items-center gap-x-2 underline underline-offset-4 capitalize"
                >
                  <GeneratedAvatar
                    seed={data.agent.name}
                    variant="botttsNeutral"
                    className="size-5"
                  />
                  {data.agent.name}
                </Link>{" "}
                <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
              </div>

              <div className="flex gap-x-2 items-center">
                <SparklesIcon className="size-4" />
                <p>General summary</p>
              </div>

              <Badge
                variant="outline"
                className="flex items-center gap-x-2 [&>svg]:size-4"
              >
                <ClockFadingIcon className="text-blue-700" />
                {data.duration ? formatDuration(data.duration) : "No Duration"}
              </Badge>

              <div>
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1
                        className="text-2xl font-medium mb-6"
                        {...props}
                      />
                    ),
                    h2: (props) => (
                      <h2
                        className="text-xl font-medium mb-6"
                        {...props}
                      />
                    ),
                    h3: (props) => (
                      <h3
                        className="text-lg font-medium mb-6"
                        {...props}
                      />
                    ),
                    h4: (props) => (
                      <h4
                        className="text-base font-medium mb-6"
                        {...props}
                      />
                    ),
                    p: (props) => (
                      <p
                        className="mb-6 leading-relaxed"
                        {...props}
                      />
                    ),
                    ul: (props) => (
                      <ul
                        className="list-disc mb-6 list-inside"
                        {...props}
                      />
                    ),
                    ol: (props) => (
                      <ol
                        className="list-decimal mb-6 list-inside"
                        {...props}
                      />
                    ),
                    li: (props) => (
                      <li
                        className="mb-1"
                        {...props}
                      />
                    ),
                    strong: (props) => (
                      <strong
                        className="font-semibold"
                        {...props}
                      />
                    ),
                    code: (props) => (
                      <code
                        className="bg-gray-100 px-1 py-0.5 rounded"
                        {...props}
                      />
                    ),
                    blockquote: (props) => (
                      <blockquote
                        className="border-l-4 pl-4 italic my-4"
                        {...props}
                      />
                    ),
                  }}
                >
                  {data.summary}
                </Markdown>
              </div>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </TabsContent>

        {/* transcript */}
        <TabsContent value="transcript">
          <Transcript meetingId={data.id} />
        </TabsContent>

        {/* recording */}
        <TabsContent value="recording">
          <div className="bg-white rounded-lg border px-4 py-5">
            {data.recordingUrl ? (
              <video
                src={data.recordingUrl}
                className="w-full rounded-lg"
                controls
              />
            ) : (
              <h1>No Recording available </h1>
            )}
          </div>
        </TabsContent>

        {/* chat */}
        {/* <TabsContent value="chat">
          <ChatProvider
            meetingId={data.id}
            meetingName={data.name}
          />
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default CompletedState;

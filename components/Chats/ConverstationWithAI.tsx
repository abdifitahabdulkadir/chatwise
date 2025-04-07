"use client";

import { toast } from "@/hooks/use-toast";
import { useConversation } from "@11labs/react";
import { Mic, MicOff, X } from "lucide-react";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import ActionButton from "../shared/ActionButton";
import EmptyChats from "./EmptyChats";

interface ConversationPros {
  closeSession: () => void;
}
export default function ConverstationWithAI({
  closeSession,
}: ConversationPros) {
  const { isSpeaking, status, endSession, startSession } = useConversation();
  const [hasSetMicPermission, setHasMicPermission] = useState("");
  async function handleStartConversation() {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await startSession({
        agentId: String(process.env.NEXT_PUBLIC_EVELNLABS_API_KEY),
      });
    } catch (error) {
      setHasMicPermission((error as Error).message);
    }
  }

  useEffect(
    function () {
      if (hasSetMicPermission?.length > 0) {
        toast({
          title: "Microphone access Denied",
          variant: "destructive",
          description: hasSetMicPermission,
        });
      }
    },
    [hasSetMicPermission],
  );

  useEffect(
    function () {
      if (status === "connected") {
        toast({
          title: "Created Chat Session",
          description: "You can chat with your chat wise agent now",
        });
      }
    },
    [status],
  );

  return (
    <div className="flex h-full w-full flex-col items-center justify-between py-20">
      <div className="mb-[20rem] flex w-full grow flex-col items-center justify-center pb-20">
        {status === "connecting" && !isSpeaking && (
          <BeatLoader color="#00897b" size={30} />
        )}

        {status !== "connecting" ? (
          isSpeaking ? (
            <ScaleLoader color="#00897b" height={100} width={7} />
          ) : (
            <EmptyChats className="h-[10rem] py-10" />
          )
        ) : null}
      </div>

      <div className="mt-auto flex w-full items-center justify-center gap-6">
        <ActionButton
          title="Start Conversation"
          isRecording={status === "connected"}
          onClick={handleStartConversation}
        >
          {status !== "connected" ? (
            <MicOff className="scale-[1.4] text-red-500" />
          ) : (
            <Mic className="text-darker scale-[1.4]" />
          )}
        </ActionButton>
        <ActionButton
          title="Close Voice"
          onClick={async () => {
            await endSession();
            toast({
              title: "Chat Session Ended",
              description: "Thank you for taking time with Chatwise agent",
              duration: 1000,
            });
            closeSession();
          }}
        >
          <X className="scale-[1.5]" />
        </ActionButton>
      </div>
    </div>
  );
}

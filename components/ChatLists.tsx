"use client";

import { toast } from "@/hooks/use-toast";
import { storeChat } from "@/lib/actions/chat.action";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { Mic, MicOff, Trash2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import BeatLoader from "react-spinners/BeatLoader";
import BounceLoader from "react-spinners/BounceLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import ActionButton from "./ActionButton";
import ChatInput from "./ChatInput";
import RenderContent from "./ChatItems";
import EmptyChats from "./EmptyChats";
import RenderInfo from "./RenderInfo";
import ScrollToDownButton from "./ScrollToDownButton";
import { useSidebarProvider } from "./SidBarToggleProvider";

interface ChatListPros {
  children: ReactNode | undefined;
}

export default function ChatLists({ children }: ChatListPros) {
  const messageParentRef = useRef<HTMLDivElement | null>(null);
  const { isSidebarOpen, toggle, addToSidebar } = useSidebarProvider();
  const params = useParams();
  const [isFinish, setIsFinish] = useState(false);
  const [startVoice, setStartVoice] = useState(false);
  const [isAIAnswering, setIsAIAnswering] = useState(false);
  const session = useSession();
  const [showScrollToBottomIcon, setShowScrollToBottomIcon] = useState(false);
  const { isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: false,
      useLegacyResults: false,
    });
  const {
    messages,
    handleInputChange,
    setInput,
    setMessages,
    isLoading: isAIGenerating,
    handleSubmit,
    input,
  } = useChat({
    api: "/api/chat",
    body: {
      isVoiceToVoice: startVoice,
    },
    onResponse() {
      addToSidebar([
        {
          title: input,
          chatId: String(params.id),
          userId: session.data?.user?.id,
        },
      ]);
    },
    onFinish(message) {
      setIsFinish(true);
      setIsAIAnswering(true);
      setMessage({
        content: message.content,
        role: message.role,
        titleId: String(params.id ?? ""),
        question: input,
      });
    },
  });
  const [message, setMessage] = useState({
    content: "",
    role: "",
    titleId: "",
    question: "",
  });
  useEffect(
    function () {
      if (messageParentRef.current) {
        messageParentRef.current.scrollTop =
          messageParentRef.current.scrollHeight;
      }
    },
    [messages],
  );

  function formSubmitHandler(
    event?: { preventDefault?: (() => void) | undefined } | undefined,
  ) {
    setIsFinish(false);
    handleSubmit(event);
  }

  function handlestartVoice() {
    if (isAIGenerating) return;
    setStartVoice(true);
    toggle();
  }

  useEffect(
    function () {
      if (isAIAnswering && startVoice) {
        const utterance = new SpeechSynthesisUtterance(message.content);
        utterance.voice = speechSynthesis.getVoices()[5];
        speechSynthesis.speak(utterance);
        utterance.onend = function () {
          setIsAIAnswering(false);
        };
      }
    },
    [isAIAnswering, message.content, startVoice],
  );

  function hanldeOnScroll(e: React.UIEvent<HTMLDivElement> | undefined) {
    const scrolHeight = Number(e?.currentTarget.scrollHeight);
    const scrollTop = Number(e?.currentTarget.scrollTop);
    if (scrolHeight - scrollTop > 1000) {
      setShowScrollToBottomIcon(true);
      return;
    }
    setShowScrollToBottomIcon(false);
  }

  useEffect(() => {
    if (!isFinish) return;
    if (startVoice) return;
    (async function saveData() {
      const result = await storeChat({
        question: message.question,
        chatId: message.titleId,
        answer: message.content,
        role: message.role == "user" ? "user" : "system",
      });

      if (result.success) {
        toast({
          title: "Chat saved successfully",
          description: "Chat has been saved successfully",
        });
        return;
      }
      toast({
        title: "Failed to Store Chat",
        description: "Failed to store chat, try again",
        variant: "destructive",
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinish]);

  useEffect(
    function () {
      if (results.length > 0) {
        setInput(
          results
            .map((result) =>
              typeof result == "string" ? result : result.transcript,
            )
            .join(" "),
        );
      }
    },
    [results, setInput],
  );
  return (
    <div
      className={cn(
        "relative mt-20 grid h-[88vh] w-full grid-rows-[1fr_auto] pb-[1.3rem]",
        isSidebarOpen ? "col-span-full" : "cols-span-1",
      )}
    >
      <div
        onScroll={hanldeOnScroll}
        ref={messageParentRef}
        className="main-scrollbar max-h-full w-full overflow-x-clip overflow-y-auto"
      >
        <div className="mx-auto h-full w-full max-w-5xl md:max-w-[80rem] md:px-20">
          {!startVoice && !children && !messages.length && <EmptyChats />}
          <div className="mx-auto mb-6 flex w-full flex-col items-center gap-4">
            {!startVoice && children}
            {!startVoice &&
              messages.length > 0 &&
              messages?.map(({ content, role }, index) => {
                return (
                  <RenderContent
                    key={index}
                    content={content}
                    isLoading={!isFinish}
                    role={role === "user" ? "user" : "system"}
                  />
                );
              })}
          </div>
          {startVoice && (
            <div className="flex h-[95%] w-full flex-col items-center justify-between">
              <div className="flex h-[50%] w-full flex-col items-center justify-center">
                {isRecording ? (
                  <BounceLoader color="#00897b" />
                ) : isAIGenerating || isAIAnswering ? null : (
                  <EmptyChats />
                )}
                {isAIGenerating && (
                  <div className="flex w-fit flex-col items-center justify-center gap-y-1">
                    <BeatLoader color="#00897b" size={30} />
                    <p className="mt-1 text-white/50 italic">Processsing....</p>
                  </div>
                )}
                {isAIAnswering && (
                  <ScaleLoader color="#00897b" height={100} width={7} />
                )}
                {!isAIAnswering && !isRecording && !isAIGenerating && (
                  <RenderInfo />
                )}
              </div>

              <div className="flex h-[40%] w-full flex-col items-center justify-center">
                <ChatInput
                  isVoicetoVoice={startVoice}
                  handleRecordVoice={handlestartVoice}
                  isLoading={isAIGenerating}
                  handleFormSubmit={formSubmitHandler}
                  hanldeOnChange={handleInputChange}
                  inputValue={input}
                />
              </div>

              <div className="flex w-full items-center justify-center gap-6">
                <ActionButton
                  title={isRecording ? "Unmute Mic" : "Mute Mic"}
                  isRecording={isRecording}
                  onClick={isRecording ? stopSpeechToText : startSpeechToText}
                >
                  {!isRecording ? (
                    <MicOff className="scale-[1.4] text-red-500" />
                  ) : (
                    <Mic className="text-darker scale-[1.4]" />
                  )}
                </ActionButton>

                <ActionButton
                  title={"clear transcript"}
                  isRecording={isRecording}
                  onClick={() => setInput("")}
                >
                  <Trash2 className="scale-[1.4] text-red-500" />
                </ActionButton>
                <ActionButton
                  title="Close Voice"
                  isRecording={isRecording}
                  onClick={() => {
                    speechSynthesis.cancel();
                    setMessage({
                      content: "",
                      role: "",
                      titleId: "",
                      question: "",
                    });
                    setMessages([]);
                    setInput("");
                    setStartVoice(false);
                  }}
                >
                  <X className="scale-[1.5]" />
                </ActionButton>
              </div>
            </div>
          )}
        </div>
      </div>
      {!startVoice && (
        <ChatInput
          isVoicetoVoice={startVoice}
          handleRecordVoice={handlestartVoice}
          isLoading={isAIGenerating}
          handleFormSubmit={formSubmitHandler}
          hanldeOnChange={handleInputChange}
          inputValue={input}
        />
      )}

      {showScrollToBottomIcon && !startVoice && (
        <ScrollToDownButton
          onClick={() => {
            const current = messageParentRef.current;
            if (current) {
              current.style.height = "auto";
              current.scrollTop = current.scrollHeight;
            }
          }}
        />
      )}
    </div>
  );
}

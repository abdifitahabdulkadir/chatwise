"use client";
import { toast } from "@/hooks/use-toast";
import { storeChat } from "@/lib/actions/chat.action";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { ChevronDown, Mic, MicOff, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import BounceLoader from "react-spinners/BounceLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import ChatInput from "./ChatInput";
import RenderContent from "./ChatItems";
import EmptyChats from "./EmptyChats";
import { useSidebarProvider } from "./SidBarToggleProvider";
import { Button } from "./ui/button";

interface ChatListPros {
  children: ReactNode | undefined;
}

export default function ChatLists({ children }: ChatListPros) {
  const messageParentRef = useRef<HTMLDivElement | null>(null);
  const { isSidebarOpen, toggle, addToSidebar } = useSidebarProvider();
  const params = useParams();
  const [isFinish, setIsFinish] = useState(false);
  const [startVoice, setStartVoice] = useState(false);
  const [micMute, setMicMute] = useState(false);
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [isAIAnswering, setIsAIAnswering] = useState(false);
  const session = useSession();
  const [showScrollToBottomIcon, setShowScrollToBottomIcon] = useState(false);
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
      if (isAIAnswering && startVoice && message.content) {
        const text = new SpeechSynthesisUtterance(message.content);
        speechSynthesis.speak(text);
        text.onend = function () {
          setIsAIAnswering(false);
        };
      }
    },
    [isAIAnswering, message.content, startVoice],
  );

  useEffect(
    function () {
      if (micMute) {
        setIsUserTalking(true);
        const speechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new speechRecognition();
        recognition.start();
        recognition.lang = "en-US";
        recognition.onnomatch = function () {
          toast({
            title: "Speech Recongnition Failed",
            description: "We couldn't recognize your speech try again",
          });
        };
        recognition.onresult = async function (event) {
          if (event.results[0].isFinal) {
            console.log("finalized");
            setInput(event.results[0][0].transcript);
            setIsUserTalking(false);
            recognition.stop();
            handleSubmit();
            setMicMute(false);
          }
        };
      }
    },
    [micMute, handleSubmit, setInput],
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
              <div className="flex h-[50%] w-full items-center justify-center">
                {isUserTalking && <BounceLoader color="#00897b" />}
                {isAIGenerating && (
                  <div className="flex w-fit flex-col items-center justify-center gap-y-1">
                    <BeatLoader color="#00897b" size={30} />
                    <p className="mt-1 text-white/50 italic">Processsing....</p>
                  </div>
                )}
                {isAIAnswering && (
                  <ScaleLoader color="#00897b" height={100} width={7} />
                )}
              </div>

              <div className="flex w-full items-center justify-center gap-6">
                <Button
                  title={micMute ? "Unmute Mic" : "Mute Mic"}
                  type="button"
                  onClick={() => setMicMute(!micMute)}
                  className="flex size-[4rem] cursor-pointer items-center justify-center rounded-full bg-white/50 transition-all duration-200 hover:scale-[1.1]"
                >
                  {!micMute ? (
                    <MicOff className="scale-[1.4] text-red-500" />
                  ) : (
                    <Mic className="text-darker scale-[1.4]" />
                  )}
                </Button>
                <Button
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
                  title="Close Voice"
                  type="button"
                  className="text-darker flex size-[4rem] cursor-pointer items-center justify-center rounded-full bg-white/50 transition-all duration-200 hover:scale-[1.1] hover:!bg-red-300 hover:!text-white"
                >
                  <X className="scale-[1.5]" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {!startVoice && (
        <ChatInput
          handleRecordVoice={handlestartVoice}
          isLoading={isAIGenerating}
          handleFormSubmit={formSubmitHandler}
          hanldeOnChange={handleInputChange}
          inputValue={input}
        />
      )}

      {showScrollToBottomIcon && !startVoice && (
        <div className="fixed right-[5%] bottom-[10rem] flex size-[2.3rem] cursor-pointer items-center justify-center rounded-full bg-white/50 p-1 transition-all duration-200 hover:scale-[1.1]">
          <ChevronDown
            onClick={() => {
              const current = messageParentRef.current;
              if (current) {
                current.style.height = "auto";
                current.scrollTop = current.scrollHeight;
              }
            }}
            className="text-darker scale-[1.3] font-bold"
          />
        </div>
      )}
    </div>
  );
}

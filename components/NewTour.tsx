"use client";

import { useChat } from "ai/react";
import toast from "react-hot-toast";
import ChatMessageSkeleton from "./ChatMessageSkeleton";
import NewTourForm from "./NewTourForm";
import TourInfo from "./TourInfo";

export default function NewTour() {
  const { messages, isLoading, setInput, handleSubmit } = useChat({
    api: "/api/new-tour/",
    onError: (errro) => {
      toast.error("Couldnot fetch the request try again.");
    },
    onResponse() {
      console.log("data come");
    },
  });

  async function handleFormSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const info = Object.fromEntries(formData.entries());
    const data = {
      data: {
        prompt: {
          city: info.city.toString(),
          country: info.country.toString(),
        },
      },
    };
    setInput(info.city.toString() + " " + info.country);
    handleSubmit(e, data);
  }

  return (
    <div className="grid grid-rows-[1fr,auto] gap-y-5 h-[94vh] pb-10 w-full">
      <NewTourForm handleOnSubmit={handleFormSubmit} isLoading={false} />
      <div className="overflow-y-auto pb-4">
        {isLoading ? (
          <ChatMessageSkeleton />
        ) : (
          messages.map((message, index) => {
            if (message.role === "assistant")
              return <TourInfo key={index} message={message.content} />;
          })
        )}
      </div>
    </div>
  );
}

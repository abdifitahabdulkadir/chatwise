import { model, models, Schema } from "mongoose";

interface ChatDoc {
  question: string;
  answer: string;
}

const ChatSchema = new Schema<ChatDoc>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const ChatsModel = models.Chats || model("Chats", ChatSchema);
export default ChatsModel;

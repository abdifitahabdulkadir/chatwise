import { model, models, Schema } from "mongoose";

interface ChatDoc {
  content: string;
  role: "system" | "user";
  chatId: string;
}

const ChatSchema = new Schema<ChatDoc>({
  content: { type: String, required: true },
  role: { type: String, enum: ["system", "user"], required: true },
  chatId: {
    type: String,
    required: true,
  },
});

const ChatsModel = models.Chats || model("Chats", ChatSchema);
export default ChatsModel;

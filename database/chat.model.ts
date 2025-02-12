import { model, models, Schema, Types } from "mongoose";
import ChatTitleModel from "./chatttile.model";

interface ChatDoc {
  content: string;
  role: "system" | "user";
  titleId: Types.ObjectId;
}

const ChatSchema = new Schema<ChatDoc>({
  content: { type: String, required: true },
  role: { type: String, enum: ["system", "user"], required: true },
  titleId: { type: Schema.Types.ObjectId, ref: ChatTitleModel },
});

const ChatsModel = models.Chats || model("Chats", ChatSchema);
export default ChatsModel;

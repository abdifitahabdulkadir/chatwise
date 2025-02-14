import { model, models, Schema, Types } from "mongoose";
import UserModel from "./user.model";

interface ChatTileI {
  title: string;
  chatId: string;
  userId: Types.ObjectId;
}

const ChatTtitleSchema = new Schema<ChatTileI>({
  title: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
});

const ChatTitleModel =
  models.ChatTitles || model("ChatTitles", ChatTtitleSchema);

export default ChatTitleModel;

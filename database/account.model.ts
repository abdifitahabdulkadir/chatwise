import { model, models, Schema } from "mongoose";
import UserModel from "./user.model";

interface AccountDoc {
  provider: "credentials" | "github" | "google";
  providerAccountId: string;
  image?: string;
  name?: string;
  password?: string;
  userId: Schema.Types.ObjectId;
}

const AccountSchema = new Schema<AccountDoc>({
  name: String,
  image: String,
  password: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
  },
  provider: {
    type: String,
    enum: ["google", "github", "credentials"],
    required: true,
  },
  providerAccountId: {
    type: String,
    required: true,
  },
});

const AccountModel = models.Account || model("Account", AccountSchema);
export default AccountModel;

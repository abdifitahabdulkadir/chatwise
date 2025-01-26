import { model, models, Schema } from "mongoose";

interface UserDoc {
  name?: string;
  email: string;
  password?: string;
  image?: string;
}
const UserSchema = new Schema<UserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  image: { type: String },
});

const UserModel = models.User || model("User", UserSchema);
export default UserModel;

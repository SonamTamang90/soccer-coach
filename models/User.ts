import mongoose, { Schema, Document, Model } from "mongoose";
import { hashPassword } from "@/lib/auth";

// Interface for User document
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for User model
interface UserModel extends Model<UserDocument> {
  findByEmail(email: string): Promise<UserDocument | null>;
}

// Define User schema
const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Add custom method to find user by email
UserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

// Create User model or use existing model
export const User =
  (mongoose.models.User as UserModel) ||
  mongoose.model<UserDocument, UserModel>("User", UserSchema);

export default User;

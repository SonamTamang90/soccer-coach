import mongoose, { Schema, Document, Model } from "mongoose";
import { hashPassword } from "@/lib/auth";

// Interface for User document
export interface UserDocument extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  referralSource: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string; // Virtual field
}

// Interface for User model
interface UserModel extends Model<UserDocument> {
  findByEmail(email: string): Promise<UserDocument | null>;
}

// Define User schema
const UserSchema = new Schema<UserDocument>(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    referralSource: {
      type: String,
      required: true,
      trim: true,
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
        // Add a virtual fullName field
        ret.fullName = `${ret.firstname} ${ret.lastname}`;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Add virtual for full name
UserSchema.virtual("fullName").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

// Add custom method to find user by email
UserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

// Pre-save middleware to handle name fields
UserSchema.pre("save", async function (next) {
  // Handle password hashing
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

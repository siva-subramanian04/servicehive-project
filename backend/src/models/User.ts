import mongoose, { Document, Schema } from 'mongoose';

export enum UserRole {
  ADMIN = 'Admin',
  SALES_USER = 'Sales User',
}

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string; // Storing the hashed password, not plain text
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    passwordHash: { type: String, required: true },
    role: { 
      type: String, 
      enum: Object.values(UserRole), 
      default: UserRole.SALES_USER 
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
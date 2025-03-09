import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Define the User model type


export type UserModel = {
  email: string;
  address: string;
  phone: string;
}
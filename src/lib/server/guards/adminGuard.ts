import { error } from "@sveltejs/kit";
import { db } from "$lib/server/database/database";
import { user } from "$lib/schema/schema";
import { eq } from "drizzle-orm";
import type { RequestEvent } from "@sveltejs/kit";

type AdminGuardResult = {
  success: boolean;
  user?: typeof user.$inferSelect;
  error?: {
    code: number;
    message: string;
  };
};

export async function requireAdmin(locals: App.Locals): Promise<AdminGuardResult> {
  const session = await locals.safeGetSession();

  if (!session?.user?.id) {
    return {
      success: false,
      error: {
        code: 401,
        message: "Unauthorized - No valid session found"
      }
    };
  }

  const [dbUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));

  if (!dbUser) {
    return {
      success: false,
      error: {
        code: 404,
        message: "User not found in database"
      }
    };
  }

  if (dbUser.role !== "admin") {
    return {
      success: false,
      error: {
        code: 403,
        message: "Forbidden - Admin access required"
      }
    };
  }

  return {
    success: true,
    user: dbUser
  };
}
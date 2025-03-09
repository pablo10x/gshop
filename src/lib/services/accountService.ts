import { supabase, getProfile, createProfile } from "$lib/database/database";

export async function validateSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) {
    throw new Error("Invalid or expired session");
  }
  return session;
}

export async function ensureUserAccount(
  userId: string,
  metadata?: {
    full_name?: string;
    phone?: string;
  }
) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const session = await validateSession();
    if (!session?.user?.email) {
      throw new Error("No valid session or email");
    }

    // Try to get existing profile
    const existingProfile = await getProfile(userId);
    if (existingProfile) {
      return existingProfile;
    }

    // Create new profile if it doesn't exist
    const newProfile = await createProfile({
      id: userId,
      email: session.user.email,
      phone: metadata?.phone?.replace(/[^\d+]/g, "") || "",
    });

    return newProfile;
  } catch (error) {
    console.error("Account creation error:", error);
    throw error;
  }
}
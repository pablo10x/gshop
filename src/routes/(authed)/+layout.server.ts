import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
export const load: LayoutServerLoad = async ({ locals: { session, user } }) => {
  // Get the auth token from cookie
  if (!session || !user) {
    redirect(302, "/login");
  }

  if (user) {
    
  }
};

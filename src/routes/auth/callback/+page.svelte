<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/auth";
  import { Spinner } from "flowbite-svelte";
  import { user, session, userProfile } from "$lib/stores/authStore";
  import type { AuthError } from "@supabase/supabase-js";

  async function createUserProfile(userData: any) {
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create profile");
    }

    return response.json();
  }

  /**
   * Constants for routing and messages
   */
  const ROUTES = {
    DEFAULT: "/",
    LOGIN_ERROR: "/login?error=auth-failed",
  } as const;

  const MESSAGES = {
    LOADING: "login in...",
    LOADING_SUB: "Please wait while we complete your sign in",
    NO_SESSION: "No session found",
    AUTH_FAILED: "Authentication Failed",
    TRY_AGAIN: "Please try signing in again",
  } as const;

  /**
   * Component state
   */
  type LoadingState = {
    loading: boolean;
    error: string | null;
  };

  let state: LoadingState = {
    loading: true,
    error: null,
  };

  /**
   * Handles the OAuth callback process:
   * 1. Gets the session from Supabase
   * 2. Sets authentication cookies
   * 3. Redirects to the return URL or home
   */
  onMount(async () => {
    try {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error(authError?.message || MESSAGES.NO_SESSION);
      }

      // Create or update profile
      const profile = await createUserProfile({
        id: session.user.id,
        email: session.user.email,
        phone: session.user.user_metadata?.phone || "",
      });

      userProfile.set(profile);

      // Set auth cookies
      document.cookie = `sb-access-token=${session.access_token}; path=/`;
      document.cookie = `sb-refresh-token=${session.refresh_token}; path=/`;

      // Handle redirect
      const returnTo =
        new URLSearchParams(window.location.search).get("returnTo") ||
        ROUTES.DEFAULT;
      goto(returnTo);
    } catch (e: unknown) {
      const error = e as AuthError;
      console.error("Auth callback error:", error);
      state.error = error.message;
      goto(ROUTES.LOGIN_ERROR);
    } finally {
      state.loading = false;
    }
  });
</script>

<div class="fixed inset-0 bg-zinc-800">
  <div class="absolute inset-0 bg-grid-white/[0.6] bg-grid-12"></div>

  {#if state.loading}
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div
        class="backdrop-blur-xl bg-white/20 p-8 rounded-2xl shadow-2xl border border-white/30 text-center space-y-6 max-w-md mx-4 transition-all duration-500"
      >
        <div class="relative">
          <div
            class="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto animate-spin"
          ></div>
          <div
            class="absolute inset-0 backdrop-blur-sm rounded-full animate-pulse"
          ></div>
        </div>

        <div class="space-y-2">
          <h1 class="text-2xl font-medium text-white">{MESSAGES.LOADING}</h1>
          <p class="text-white/70">{MESSAGES.LOADING_SUB}</p>
        </div>
      </div>
    </div>
  {:else if state.error}
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div
        class="backdrop-blur-xl bg-white/20 p-8 rounded-2xl shadow-2xl border border-white/30 text-center space-y-6 max-w-md mx-4"
      >
        <div
          class="w-16 h-16 rounded-full bg-red-100/20 backdrop-blur-sm mx-auto flex items-center justify-center"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div class="space-y-4">
          <h1 class="text-2xl font-medium text-white">
            {MESSAGES.AUTH_FAILED}
          </h1>
          <p class="text-white/70">{state.error}</p>
          <p class="text-white/50 text-sm">{MESSAGES.TRY_AGAIN}</p>
        </div>

        <a
          href="/login"
          class="inline-block px-6 py-3 text-sm font-medium text-white backdrop-blur-xl bg-white/20 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
        >
          Return to Login
        </a>
      </div>
    </div>
  {/if}
</div>

<style>
</style>

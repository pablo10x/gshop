<script lang="ts">
  import { signIn, signInWithProvider } from "$lib/auth";
  import AuthGuard from "$lib/components/AuthGuard.svelte";
  import { Alert, Button, Input, Label } from "flowbite-svelte";

  let email = "";
  let password = "";
  let loading = false;
  let error = "";

  const handleSubmit = async () => {
    try {
      loading = true;
      error = "";
      await signIn(email, password);
      // Successful login will redirect via the AuthGuard
    } catch (e: any) {
      error = e.message || "Failed to sign in";
      console.log("failed to sign in");
    } finally {
      loading = false;
    }
  };

  const handleOAuthLogin = async (
    provider: "google" | "github" | "facebook"
  ) => {
    try {
      loading = true;
      error = "";
      await signInWithProvider(provider);
    } catch (e: any) {
      error = e.message || `Failed to sign in with ${provider}`;
      loading = false;
    }
  };
</script>

<AuthGuard requiredAuth={false}>
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
  >
    <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
          Sign in to your account
        </h1>

        {#if error}
          <Alert color="red" class="mb-4">{error}</Alert>
        {/if}

        <form
          class="space-y-4 md:space-y-6"
          on:submit|preventDefault={handleSubmit}
        >
          <div>
            <Label for="email" class="block mb-2">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              bind:value={email}
              required
              placeholder="name@company.com"
            />
          </div>
          <div>
            <Label for="password" class="block mb-2">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              bind:value={password}
              required
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" class="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <div
            class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p class="text-center font-semibold mx-4">OR</p>
          </div>

          <Button
            color="light"
            class="w-full mb-2"
            on:click={() => handleOAuthLogin("google")}
          >
            <svg
              class="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fill-rule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clip-rule="evenodd"
              />
            </svg>
            Continue with Google
          </Button>

          <Button
            color="dark"
            class="w-full"
            on:click={() => handleOAuthLogin("github")}
          >
            <svg
              class="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                clip-rule="evenodd"
              />
            </svg>
            Continue with GitHub
          </Button>
        </form>

        <p class="text-sm font-light text-gray-500">
          Don't have an account yet? <a
            href="/register"
            class="font-medium text-primary-600 hover:underline">Sign up</a
          >
        </p>
      </div>
    </div>
  </div>
</AuthGuard>

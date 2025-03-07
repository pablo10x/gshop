<script lang="ts">
  import { signIn, signUp, signInWithProvider } from "$lib/auth";
  import AuthGuard from "$lib/components/AuthGuard.svelte";
  import { Alert, Button, Input, Label, Tabs, TabItem, Spinner } from "flowbite-svelte";

  let activeTab = 'login';
  let email = "";
  let password = "";
  let fullName = "";
  let phone = "";
  let loading = false;
  let error = "";

  // Reset form fields when switching tabs
  $: if (activeTab) {
    email = "";
    password = "";
    fullName = "";
    phone = "";
    error = "";
  }

  // Phone number validation
  const validatePhone = (number: string) => {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    return cleanNumber.length === 8;
  };

  const handleLogin = async () => {
    try {
      loading = true;
      error = "";
      await signIn(email, password);
    } catch (e: any) {
      error = e.message || "Failed to sign in";
    } finally {
      loading = false;
    }
  };

  const handleRegister = async () => {
    try {
      loading = true;
      error = "";
      
      // Validate phone number
      if (!validatePhone(phone)) {
        throw new Error("Please enter a valid 8-digit phone number");
      }

      const formattedPhone = '+216' + phone.replace(/[^0-9]/g, '');
      await signUp(email, password, { 
        full_name: fullName.trim(), 
        phone: formattedPhone 
      });
    } catch (e: any) {
      error = e.message || "Failed to register";
    } finally {
      loading = false;
    }
  };

  const handleOAuthLogin = async (provider: "google" | "facebook") => {
    try {
      loading = true;
      error = "";
      await signInWithProvider(provider);
    } catch (e: any) {
      error = e.message || `Failed to sign in with ${provider}`;
    } finally {
      loading = false;
    }
  };
</script>

<AuthGuard requiredAuth={false}>
  <div class="flex flex-col items-center justify-center min-h-screen px-6 py-8 bg-gray-50">
    <div class="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <Tabs style="underline" bind:activeTab>
          <TabItem open title="Login">
            {#if error}
              <Alert color="red" class="mb-4" dismissable>{error}</Alert>
            {/if}

            <form class="space-y-4 md:space-y-6" on:submit|preventDefault={handleLogin}>
              <div>
                <Label for="email" class="block mb-2">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  bind:value={email}
                  required
                  disabled={loading}
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
                  disabled={loading}
                  placeholder="••••••••"
                  minlength="6"
                />
              </div>
              <Button type="submit" class="w-full" disabled={loading}>
                {#if loading}
                  <Spinner class="mr-3" size="4" color="white" />
                  Signing in...
                {:else}
                  Sign in
                {/if}
              </Button>

              <div class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p class="text-center font-semibold mx-4 text-gray-500">OR</p>
              </div>

              <Button color="light" class="w-full mb-2" disabled={loading} on:click={() => handleOAuthLogin("google")}>
                <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                  <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
                </svg>
                {loading ? 'Please wait...' : 'Continue with Google'}
              </Button>

              <Button color="blue" class="w-full" disabled={loading} on:click={() => handleOAuthLogin("facebook")}>
                <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                {loading ? 'Please wait...' : 'Continue with Facebook'}
              </Button>
            </form>
          </TabItem>

          <TabItem title="Register">
            {#if error}
              <Alert color="red" class="mb-4" dismissable>{error}</Alert>
            {/if}

            <form class="space-y-4 md:space-y-6" on:submit|preventDefault={handleRegister}>
              <div>
                <Label for="register-email" class="block mb-2">Email</Label>
                <Input
                  type="email"
                  name="register-email"
                  id="register-email"
                  bind:value={email}
                  required
                  disabled={loading}
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <Label for="register-password" class="block mb-2">Password</Label>
                <Input
                  type="password"
                  name="register-password"
                  id="register-password"
                  bind:value={password}
                  required
                  disabled={loading}
                  placeholder="••••••••"
                  minlength="6"
                />
              </div>
              <div>
                <Label for="full-name" class="block mb-2">Full Name</Label>
                <Input
                  type="text"
                  name="full-name"
                  id="full-name"
                  bind:value={fullName}
                  required
                  disabled={loading}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label for="phone" class="block mb-2">Phone Number</Label>
                <div class="flex">
                  <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    +216
                  </span>
                  <Input
                    type="tel"
                    name="phone"
                    id="phone"
                    bind:value={phone}
                    required
                    disabled={loading}
                    class="rounded-l-none"
                    placeholder="12345678"
                    pattern="[0-9]{8}"
                    title="Please enter a valid 8-digit phone number"
                  />
                </div>
              </div>
              <Button type="submit" class="w-full" disabled={loading}>
                {#if loading}
                  <Spinner class="mr-3" size="4" color="white" />
                  Creating account...
                {:else}
                  Create account
                {/if}
              </Button>
            </form>
          </TabItem>
        </Tabs>
      </div>
    </div>
  </div>
</AuthGuard>
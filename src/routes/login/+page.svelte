<script lang="ts">
  import { nodes } from "./../../../.svelte-kit/generated/client-optimized/app.js";
  // Import statements
  import {
    Alert,
    Button,
    Input,
    Label,
    Tabs,
    TabItem,
    Spinner,
    FloatingLabelInput,
    Select,
    Helper,
  } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import type { PageProps } from "./$types";
  import type { PageData } from "./$types";
  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { superForm } from "sveltekit-superforms/client";
  import { writable } from "svelte/store";
  import { notifications } from "$lib/stores/notificationStore";

  // Types
  interface LoginForm {
    email: string;
    password: string;
  }

  // Page data
  const { data } = $props();

  // Form state
  const {
    form,
    errors: registerForm_errors,
    constraints: registerForm_constraints,
    message: registerForm_message,
    enhance,
  } = superForm(data.registerForm);
  let activeTab = writable("login");

  // Registration form fields
  let email = $state("");
  let password = $state("");
  let fullName = $state("");
  let phone = $state("");
  let etat = $state("");
  let villeAdr = $state("");

  // Login form state
  let emailLogin = $state<LoginForm>({ email: "", password: "" });
  let loading = $state(false);
  let error = $state(false);

  /**
   * Validates phone number format
   * @param number - Phone number to validate
   * @returns boolean - True if phone number is valid (8 digits)
   */
  const validatePhone = (number: string): boolean => {
    const cleanNumber = number.replace(/[^0-9]/g, "");
    return cleanNumber.length === 8;
  };
</script>

<div
  class=" min-h-screen flex items-center justify-center 
  bg-gradient-to-r from-zinc-400 via-white to-teal-300
  bg-[size:500%] animate-gradient-move px-4"
>
  <div class="w-full md:w-1/2 lg:w-1/1 animate-fadeIn">
    <div
      class=" bg-zinc-600/70 backdrop-blur-lg rounded-2xl shadow-sm drop-shadow-sm shadow-sky-200 px-5 space-y-6 py-6 transition-all duration-300 ease-in-out"
    >
      <h1
        class="backdrop-brightness-95 backdrop-blur-lg rounded-lg text-3xl font-bold text-center text-zinc-200 p-6 mb-8 space-x-2"
      >
        Bienvenue
      </h1>

      <Tabs
        tabStyle="underline"
        style="pills"
        class="!border-none items-center justify-center "
      >
        <TabItem
          open={$activeTab === "login"}
          title="SE CONNECTER"
          value="login"
          class="text-white  bg-white rounded-md hover:shadow-md hover:shadow-white/50 focus:shadow-md focus:shadow-lime-200   animate-fadeIn"
        >
          <div
            in:fly={{ y: 15, duration: 300, delay: 50, easing: quintOut }}
            out:fade={{ duration: 100 }}
          >
            {#if error}
              <Alert color="red" class="mb-4 animate-fadeIn" dismissable
                >{error}</Alert
              >
            {/if}

            <form use:enhance method="POST" action="?/login" class="space-y-8">
              <div class="space-y-2">
                <FloatingLabelInput
                  style="filled"
                  type="email"
                  name="email"
                  id="email"
                  bind:value={$form.email}
                  required
                  disabled={loading}
                  placeholder="nom@email.com"
                  class="bg-white/20 border-gray-600 placeholder-gray-400 text-white"
                  >Email</FloatingLabelInput
                >
              </div>

              <div class="space-y-5">
                <FloatingLabelInput
                  type="password"
                  name="password"
                  id="password"
                  bind:value={emailLogin.password}
                  required
                  disabled={loading}
                  placeholder="••••••••"
                  minlength={6}
                  class="bg-white/20 border-gray-600 placeholder-gray-700 text-zinc-600 "
                  >Password</FloatingLabelInput
                >
              </div>

              <Button
                type="submit"
                class="w-full bg-zinc-800  transition-all duration-200"
                disabled={loading}
              >
                {#if loading}
                  <Spinner class="mr-3" size="4" color="white" />
                  Signing in...
                {:else}
                  Sign in
                {/if}
              </Button>
            </form>

            <div class="relative my-8">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-600"></div>
              </div>
              <div class="relative flex justify-center">
                <span class="px-4 text-sm text-gray-400 bg-zinc-800"
                  >Ou continuez avec</span
                >
              </div>
            </div>

            <div class="space-y-3">
              <form use:enhance method="POST" action="?/googleLogin">
                <Button
                  type="submit"
                  color="light"
                  class="w-full hover:bg-gray-200 transition-all duration-200"
                >
                  <svg
                    class="w-5 h-5 mr-2"
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
              </form>

              <form use:enhance method="POST" action="?/facebookLogin">
                <Button
                  type="submit"
                  color="blue"
                  class="w-full bg-sky-600 hover:bg-sky-200 hover:text-black transition-all duration-200"
                >
                  <svg
                    class="w-5 h-5 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                  Continue with Facebook
                </Button>
              </form>
            </div>
          </div></TabItem
        >

        <TabItem title="CREER UN COMPTE" value="register" class="text-white  bg-white rounded-md hover:shadow-md hover:shadow-white/50 animate-fadeIn">
          <div
            in:fly={{ y: 15, duration: 300, delay: 50, easing: quintOut }}
            out:fade={{ duration: 100 }}
          >
            <div class="items-center justify-center"></div>
            <form
              use:enhance
              method="POST"
              action="?/signup"
              class="space-y-8 gap-y-8 animate-fadeIn"
            >
              <div class="grid grid-cols-1 gap-6">
                <div class="space-y-2">
                  <FloatingLabelInput
                    type="text"
                    style="standard"
                    name="fullname"
                    color={$registerForm_errors.fullname ? "red" : "base"}
                    id="fullname"
                    bind:value={$form.fullname}
                    maxlength={20}
                    disabled={loading}
                    placeholder="FullName"
                    class="bg-black border-green-800 placeholder-gray-800 text-slate-800  font-roboto  focus:border-lime-500  focus:ring-lime-100  focus:shadow-lg"
                    >Nom et prénom</FloatingLabelInput
                  >
                  {#if $registerForm_errors.fullname}
                    <Helper color="red" class="flex flex-row gap-x-2 animate-fadeIn">
                      <span class="font-bold">!</span>
                      <div class="text-red-500 font-roboto font-bold underline underline-offset-4 ">{$registerForm_errors.fullname}</div>
  
                    </Helper>
                  {/if}
                </div>

                <div class="space-y-2">
                  <FloatingLabelInput
                    type="email"
                    name="email"
                    id="email"
                    color={$registerForm_errors.email ? "red" : "base"}
                    bind:value={$form.email}
                    disabled={loading}
                    placeholder="email.com"
                    class="bg-white border-gray-600 placeholder-gray-400 text-slate-800 font-rubik  focus:border-lime-500  focus:ring-lime-100  focus:shadow-lg"
                    >Email</FloatingLabelInput
                  >
                  {#if $registerForm_errors.email}
                    <Helper color="red" class="flex flex-row gap-x-2 animate-fadeIn">
                      <span class="font-bold">!</span>
                      <div class="text-red-500 font-roboto font-bold underline underline-offset-4 ">{$registerForm_errors.email}</div>
  
                    </Helper>
                  {/if}
                </div>

                <div class="space-y-2 text-orange-400 font-rubik">
                  <FloatingLabelInput
                    type="password"
                    name="password"
                    id="password"
                    bind:value={$form.password}
                    color={$registerForm_errors.password ? "red" : "base"}
                    disabled={loading}
                    placeholder="********"
                    class="bg-white/20 border-gray-600 placeholder-gray-400 text-slate-800 font-rubik  focus:border-lime-500  focus:ring-lime-100  focus:shadow-lg"
                    >Mot de passe</FloatingLabelInput
                  >
                   {#if $registerForm_errors.password}
                    <Helper color="red" class="flex flex-row gap-x-2 animate-fadeIn">
                      <span class="font-bold">!</span>
                      <div class="text-red-500 font-roboto font-bold underline underline-offset-4 ">{$registerForm_errors.password}</div>
  
                    </Helper>
                  {/if}
                </div>

                <div class="space-y-2">
                  <Label
                    for="region"
                    class="text-gray-600 font-rubik underline underline-offset-6"
                    >Région / Département</Label
                  >
                  <Select
                    name="etat"
                    id="etat"
                    bind:value={etat}
                    disabled={loading}
                    class="bg-zinc-200 backdrop-blur-lg border-gray-200 text-slate-800 font-rubik  focus:border-sky-500  focus:ring-lime-100  focus:shadow-lg"
                  >
                    {#each data.governorates as delegation}
                      <option
                        class="bg-zinc-800/20 backdrop-blur-md text-white transition-opacity duration-200 ease-in-out text-2xl font-roboto"
                        value={delegation.name}
                      >
                        {delegation.name}
                      </option>
                    {/each}
                  </Select>
                  {#if $registerForm_errors.etat}
                    <Helper color="red" class="flex flex-row gap-x-2 animate-fadeIn">
                      <span class="font-bold">!</span>
                      <div class="text-red-500 font-roboto font-bold underline underline-offset-4 ">{$registerForm_errors.etat}</div>
  
                    </Helper>
                  {/if}
                </div>

                <div class="space-y-1">
                  <Label
                    for="town"
                    class="text-gray-600 font-rubik underline underline-offset-6"
                    >Ville</Label
                  >
                  <Select
                    name="villeAdr"
                    id="villeAdr"
                    bind:value={villeAdr}
                    disabled={loading || !etat}
                    class="bg-zinc-500 border-gray-600  text-slate-100 font-rubik  focus:border-sky-500  focus:ring-lime-100  focus:shadow-lg"
                  >
                    {#if etat}
                      {#each data.governorates.find((gov: any) => gov.name === etat).delegations as city}
                        <option
                          class="bg-zinc-800/20 backdrop-blur-md text-white transition-opacity duration-200 ease-in-out text-2xl font-roboto"
                          value={city}>{city}</option
                        >
                      {/each}
                    {/if}
                  </Select>
                  {#if $registerForm_errors.villeAdr}
                    <Helper color="red" class="flex flex-row gap-x-2 animate-fadeIn">
                      <span class="font-bold">!</span>
                      <div class="text-red-500 font-roboto font-bold underline underline-offset-4 ">{$registerForm_errors.villeAdr}</div>
  
                    </Helper>
                  {/if}
                </div>

                <div class="space-y-2">
                  <Label for="phone" class="text-gray-800">Phone Number</Label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    >
                      <span class="flex items-center gap-2">
                        <img
                          src="https://flagcdn.com/w20/tn.png"
                          alt="Tunisia flag"
                          class="w-4 h-3"
                        />
                        <span class="text-gray-400">+216</span>
                      </span>
                    </div>
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      bind:value={$form.phone}
                      disabled={loading}
                      placeholder="12 345 678"
                      maxlength={8}
                      class="bg-white/20 border-gray-600 placeholder-gray-400 text-slate-800 font-rubik  focus:border-lime-500 underline focus:ring-lime-100 pl-24"
                    />
                  </div>
                  {#if $registerForm_errors.phone}
                    <Helper color="red" class="flex flex-row gap-x-2 animate-fadeIn">
                      <span class="font-bold">!</span>
                      <div class="text-red-500 font-roboto font-bold underline underline-offset-4 ">{$registerForm_errors.phone}</div>
  
                    </Helper>
                  {/if}
                  {#if phone && !validatePhone(phone)}
                    <Alert border color="red">
                      <InfoCircleSolid slot="icon" class="w-5 h-5" />
                      <span class="font-medium">!</span>
                      Veuillez saisir un numéro de téléphone valide à 8 chiffres
                    </Alert>
                    <!--  <Alert class="text-red-400 text-sm mt-1 font-roboto font-bold">Veuillez saisir un numéro de téléphone valide à 8 chiffres</Alert> -->
                  {/if}
                </div>
              </div>

              <Button
                type="submit"
                class="w-full bg-zinc-800 hover:bg-lime-700 transition-all duration-200 mt-6 hover:text-black"
                disabled={loading}
              >
                {#if loading}
                  <Spinner class="mr-3" size="4" color="gray" />
                  Registering...
                {:else}
                  Registre
                {/if}
              </Button>
            </form>
          </div></TabItem
        >
      </Tabs>
    </div>
  </div>
</div>

<style>
 

 

  :global(.animate-fadeIn) {
    animation: fadeIn 0.2s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  :global(.animate-bounceIn) {
    animation: bounceIn 0.2s ease-in-out;
  }

  @keyframes bounceIn {
    0% {
      opacity: 0.5;
      transform: scale(0.2);
    }
    50% {
      opacity: 1;
      transform: scale(0.7);
    }
    100% {
      transform: scale(1);
    }
  }
  *:global(.animate-shake) {
    animation: shake 0.5s ease-in-out;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-5px);
    }
  }
</style>

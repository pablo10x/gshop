<script lang="ts">
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
  } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  let { data }: PageProps = $props();

  let activeTab = "login";
  let email = $state("");
  let password = $state("");
  let fullName = $state("");
  let phone = $state("");
  let etat = $state("");
  let villeAdr = $state("");

  let emailLogin = $state({ email: "", password: "" });
  let loading = false;
  let error = $state(false);

  const validatePhone = (number: string) => {
    const cleanNumber = number.replace(/[^0-9]/g, "");
    return cleanNumber.length === 8;
  };

  function validateInput(event: any) {
    if (!event.target.value.trim()) {
      event.target.setCustomValidity("Please enter your full name.");
    } else {
      event.target.setCustomValidity("");
    }
  }
</script>

<div
  class="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-700 px-6"
>
  <div class="w-full max-w-md">
    <div
      class="backdrop-blur-xl bg-zinc-800 rounded-2xl shadow-2xl px-5  space-y-6"
    >
      <h1 class="text-3xl font-bold text-center text-zinc-200 p-6 mb-8 space-x-2">
        Bienvenue
      </h1>
     

      <Tabs style="pills" class="!border-none">
        <TabItem open title="Se connecter" class="text-white animate-fadeIn">
          <div
              in:fly={{ y: 15, duration: 300, delay:50, easing: quintOut }}
              out:fade={{ duration: 100 }}
            >
          {#if error}
            <Alert color="red" class="mb-4 animate-fadeIn" dismissable
              >{error}</Alert
            >
          {/if}

          <form method="POST" action="?/login" class="space-y-8">
            <div class="space-y-2">
             
              <FloatingLabelInput style="filled"
                type="email"
                name="email"
                id="email"
                bind:value={emailLogin.email}
                required
                disabled={loading}
                placeholder="nom@email.com"
                class="bg-white/20 border-gray-600 placeholder-gray-400 text-white"
             >Email</FloatingLabelInput>
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
             >Password</FloatingLabelInput>
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
            <form method="POST" action="?/googleLogin">
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

            <form method="POST" action="?/facebookLogin">
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
        </TabItem>

        <TabItem title="Créer un compte" value="register">
           <div
              in:fly={{ y: 15, duration: 300, delay:50, easing: quintOut }}
              out:fade={{ duration: 100 }}
            >
          <form method="POST" action="?/signup" class="space-y-6 gap-y-6">
            <div class="grid grid-cols-1 gap-4">
              <div class="space-y-6">
                <FloatingLabelInput
                  type="text"
                  name="fullname"
                  id="fullname"
                  bind:value={fullName}
                  on:invalid={validateInput}
                  on:input={validateInput}
                  required
                  maxlength={12}
                  disabled={loading}
                  placeholder="Full Name"
                  class="bg-black border-gray-600 placeholder-gray-800 text-slate-800  font-roboto  focus:border-lime-500  focus:ring-lime-100  focus:shadow-lg"
                >Nom et prénom</FloatingLabelInput>
              </div>

              <div class="space-y-6">
                
                <FloatingLabelInput
                  type="email"
                  name="email"
                  id="email"
                  bind:value={email}
                  required
                  disabled={loading}
                  placeholder="email.com"
                  class="bg-white border-gray-600 placeholder-gray-400 text-slate-800 font-rubik  focus:border-lime-500  focus:ring-lime-100  focus:shadow-lg"
                >Email</FloatingLabelInput>
              </div>

              <div class="space-y-3 text-orange-400 font-rubik">
                
                <FloatingLabelInput
                  type="password"
                  name="password"
                  id="password"
                  bind:value={password}
                  required
                  disabled={loading}
                  placeholder="********"
                  class="bg-white/20 border-gray-600 placeholder-gray-400 text-slate-800 font-rubik  focus:border-lime-500  focus:ring-lime-100  focus:shadow-lg"
                 >Mot de passe</FloatingLabelInput>
              </div>

              <div class="space-y-3">
                <Label for="region" class="text-red-400 font-rubik underline underline-offset-6"
                  >Région / Département</Label
                >
                <Select
                  name="etat"
                  id="etat"
                  bind:value={etat}
                  required
                  disabled={loading}
                  class="bg-zinc-500 backdrop-blur-lg border-gray-600 text-slate-200 font-rubik  focus:border-sky-500  focus:ring-lime-100  focus:shadow-lg"
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
              </div>

              <div class="space-y-4">
                <Label for="town" class="text-red-400 font-rubik underline underline-offset-6"
                  >Ville</Label
                >
                <Select
                  name="villeAdr"
                  id="villeAdr"
                  bind:value={villeAdr}
                  required
                  disabled={loading || !etat}
                  class="bg-zinc-500 border-gray-600  text-slate-100 font-rubik  focus:border-sky-500  focus:ring-lime-100  focus:shadow-lg"
                >
                  {#if etat}
                    {#each data.governorates.find((gov: any) => gov.name === etat).delegations as city}
                      <option class="bg-zinc-800/20 backdrop-blur-md text-white transition-opacity duration-200 ease-in-out text-2xl font-roboto"
                       value={city}>{city}</option>
                    {/each}
                  {/if}
                </Select>
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
                    bind:value={phone}
                    required
                    disabled={loading}
                    placeholder="12 345 678"
                    maxlength={8}
                    class="bg-white/20 border-gray-600 placeholder-gray-400 text-slate-800 font-rubik  focus:border-lime-500 underline focus:ring-lime-100 pl-24"
                  />
                </div>
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
        </TabItem>
      </Tabs>
    </div>
  </div>
</div>

<style>
  :global(.animate-fadeIn) {
    animation: fadeIn 0.3s ease-in-out;
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
</style>

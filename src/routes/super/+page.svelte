<script lang="ts">
  import { Label, Input, Button } from "flowbite-svelte";
  import { superForm } from "sveltekit-superforms/client";
  import type { PageData } from './$types';

  let { data } = $props();

  const { form, errors, enhance, message } = superForm(data.form);
</script>

<div class="items-center justify-center flex flex-col py-6 bg-slate-300 rounded-md px-6">
  {#if $message}
    <div class="alert alert-success mb-4">
      {$message}
    </div>
  {/if}

  <form method="POST" use:enhance class="space-y-4 w-full max-w-md">
    <div class="space-y-2">

      <Label for="name">Name</Label>
      <Input
        type="text"
        id="name"
        name="name"
        bind:value={$form.name}
        
     
      />
      {#if $errors.name}
        <p class="text-red-500 text-sm font-roboto">{$errors.name}</p>
      {/if}
    </div>

    <Button type="submit" class="w-full">Submit</Button>
  </form>
</div>
<script lang="ts">
  import { fly } from "svelte/transition";

  export let message: string = "Item added to cart!";
  export let variant: "success" | "error" | "warning" = "success";

  const variantStyles: Record<typeof variant, string> = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  };
</script>

<div
  transition:fly={{ y: 20, duration: 300 }}
  class="fixed bottom-4 right-4 text-white px-6 py-3 rounded-lg shadow-lg flex items-center {variantStyles[
    variant
  ]}"
>
  <svg
    class="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {#if variant === "success"}
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 13l4 4L19 7"
      />
    {:else if variant === "error"}
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    {:else}
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    {/if}
  </svg>
  {message}
</div>

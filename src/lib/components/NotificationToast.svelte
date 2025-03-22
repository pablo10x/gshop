<script lang="ts">
  import { notifications, type Notification } from '$lib/stores/notificationStore';
  import { fade, fly } from 'svelte/transition';
  import { Alert } from 'flowbite-svelte';
  import { 
    CheckCircleSolid, 
    ExclamationCircleSolid, 
    InfoCircleSolid 
  } from 'flowbite-svelte-icons';

  // Update the colors object to use valid Flowbite Alert colors
  const colors: Record<Notification['type'], 'red' | 'green' | 'yellow'> = {
    success: 'green',
    error: 'red',
    warning: 'yellow'
  } as const;

  const icons = {
    success: CheckCircleSolid,
    error: ExclamationCircleSolid,
    warning: InfoCircleSolid
  };
</script>

<div 
  class="fixed bottom-0 right-0 z-50 p-4 space-y-3 w-full max-w-xs sm:max-w-md lg:max-w-lg"
  aria-live="assertive"
>
  {#each $notifications as notification (notification.id)}
    <div
      in:fly={{ y: 50, duration: 400 }}
      out:fade={{ duration: 300 }}
      class="flex w-full transform hover:scale-102 transition-transform duration-200"
    >
      <Alert
        color={colors[notification.type]}
        dismissable
        class="w-full shadow-lg backdrop-blur-sm bg-opacity-95 border-l-4"
        on:dismiss={() => notifications.remove(notification.id)}
      >
        <svelte:component 
          this={icons[notification.type]} 
          class="w-6 h-6 mr-3 animate-bounce-subtle" 
          slot="icon"
        />
        <span class="font-medium text-sm sm:text-base">
          {notification.message}
        </span>
      </Alert>
    </div>
  {/each}
</div>

<style>
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }
  
  :global(.animate-bounce-subtle) {
    animation: bounce-subtle 2s infinite;
  }
  
  :global(.transform) {
    transition: all 0.2s ease;
  }
  
  :global(.hover\:scale-102:hover) {
    transform: scale(1.02);
  }
</style>
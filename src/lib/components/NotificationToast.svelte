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
  class="fixed top-4 right-4 z-50 space-y-2 w-full max-w-xs sm:max-w-md md:max-w-lg"
  aria-live="assertive"
>
  {#each $notifications as notification (notification.id)}
    <div
      in:fly={{ x: 300, duration: 300 }}
      out:fade={{ duration: 300 }}
      class="flex w-full"
    >
      <Alert
        color={colors[notification.type]}
        dismissable
        on:dismiss={() => notifications.remove(notification.id)}
      >
        <svelte:component 
          this={icons[notification.type]} 
          class="w-5 h-5 mr-2" 
          slot="icon"
        />
        <span class="font-medium">
          {notification.message}
        </span>
      </Alert>
    </div>
  {/each}
</div>
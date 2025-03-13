import { writable } from 'svelte/store';

export type NotificationType = 'success' | 'error' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

function createNotificationStore() {
  const { subscribe, update } = writable<Notification[]>([]);

  return {
    subscribe,
    add: (message: string, type: NotificationType = 'success') => {
      const id = crypto.randomUUID();
      update(notifications => [...notifications, { id, type, message }]);
      
      setTimeout(() => {
        update(notifications => notifications.filter(n => n.id !== id));
      }, 3000);
    },
    remove: (id: string) => {
      update(notifications => notifications.filter(n => n.id !== id));
    }
  };
}

export const notifications = createNotificationStore();
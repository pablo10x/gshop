import type { Session } from '@supabase/supabase-js';
import type { InferSelectModel } from 'drizzle-orm';
import type { user } from '$lib/schema/schema';

declare global {
  namespace App {
    interface Locals {
      session?: Session;
      profile?: InferSelectModel<typeof user> | null;
    }
    interface PageData {
      session?: Session;
      profile?: InferSelectModel<typeof user>;
    }
  }
}

export { };
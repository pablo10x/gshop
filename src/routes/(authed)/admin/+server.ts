import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database/database';
import { products } from '$lib/schema/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
  try {
    const allProducts = await db.select().from(products);
    return json(allProducts);
  } catch (error) {
    return json({ error: 'Failed to fetch products' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const product = await request.json();
    const result = await db.insert(products).values(product).returning();
    return json(result[0]);
  } catch (error) {
    return json({ error: 'Failed to create product' }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ request }) => {
  try {
    const { id, ...updates } = await request.json();
    const result = await db
      .update(products)
      .set(updates)
      .where(eq(products.id, id))
      .returning();
    return json(result[0]);
  } catch (error) {
    return json({ error: 'Failed to update product' }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ request }) => {
  try {
    const { id } = await request.json();
    await db.delete(products).where(eq(products.id, id));
    return json({ success: true });
  } catch (error) {
    return json({ error: 'Failed to delete product' }, { status: 500 });
  }
};
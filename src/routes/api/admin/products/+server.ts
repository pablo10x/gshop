import { json } from "@sveltejs/kit";
import { db } from "$lib/server/database/database";
import { products } from "$lib/schema/schema";
import { eq } from "drizzle-orm";
import type { RequestHandler } from "@sveltejs/kit";
import { requireAdmin } from "$lib/server/guards/adminGuard";
export const GET: RequestHandler = async ({ request, locals }) => {
  const { success, error } = await requireAdmin(locals);
  if (!success) {
    return json(error, { status: error?.code || 500 });
  }
  try {
    const allProducts = await db.select().from(products);
    return json(allProducts);
  } catch (error: any) {
    console.error("Failed to fetch products:", error);
    return json({ error: error.message }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {
  const { success, error } = await requireAdmin(locals);
    if (!success) {
      return json(error, { status: error?.code || 500 });
    }
  try {
    const productData = await request.json();

    // Omit createdAt and updatedAt as they're handled by default values
    const result = await db
      .insert(products)
      .values({
        name: productData.name,
        price: productData.price,
        info: productData.info || "",
        isNew: productData.isNew || false,
        onSale: productData.onSale || false,
        oldPrice: productData.oldPrice || null,
        rating: productData.rating || 0,
        categoryId: productData.categoryId,
      })
      .returning();

    return json(result[0]);
  } catch (error: any) {
    console.error("Failed to create product:", error);
    return json({ error: error.message }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ request, locals }) => {
  const { success, error } = await requireAdmin(locals);
    if (!success) {
      return json(error, { status: error?.code || 500 });
    }
  try {
    const productData = await request.json();
    const { id, createdAt, updatedAt, ...updateData } = productData;

    // Remove any undefined values
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key],
    );

    const result = await db
      .update(products)
      .set({
        ...updateData,
        // Only update what's provided, let DB handle timestamps
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    if (!result.length) {
      return json({ error: "Product not found" }, { status: 404 });
    }

    return json(result[0]);
  } catch (error: any) {
    console.error("Failed to update product:", error);
    return json({ error: error.message }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
  const { success, error } = await requireAdmin(locals);
    if (!success) {
      return json(error, { status: error?.code || 500 });
    }
  try {
    const { id } = await request.json();
    const result = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    if (!result.length) {
      return json({ error: "Product not found" }, { status: 404 });
    }

    return json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete product:", error);
    return json({ error: error.message }, { status: 500 });
  }
};

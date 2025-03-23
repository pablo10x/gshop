import { json } from "@sveltejs/kit";
import { db } from "$lib/server/database/database";
import { Collections } from "$lib/schema/schema";
import { eq } from "drizzle-orm";
import type { RequestHandler } from "@sveltejs/kit";
export const GET: RequestHandler = async ({ request, locals }) => {
  // console.log(locals)


  try {
      
    const allCollections = await db.select().from(Collections);
    return json(allCollections);
  } catch (error: any) {
    console.error("Failed to fetch Collections:", error);
    return json({ error: error.message }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {

  try {
    const categoryData = await request.json();
    const result = await db
      .insert(Collections)
      .values({
        name: categoryData.name,
      })
      .returning();

    return json(result[0]);
  } catch (error: any) {
    console.error("Failed to create category:", error);
    return json({ error: error.message }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ request, locals }) => {
  
  try {
    const categoryData = await request.json();
    const { id, ...updateData } = categoryData;

    console.log("Received category data:", categoryData); // Log received data
    // Remove any undefined values
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );
    const result = await db
      .update(Collections)
      .set(updateData)
      .where(eq(Collections.id, id))
      .returning();

    console.log("Update result:", result); // Log update result

    if (!result.length) {
      return json({ error: "Category not found" }, { status: 404 });
    }

    return json(result[0]);
  } catch (error: any) {
    console.error("Failed to update category:", error);
    return json({ error: error.message }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
 
  try {
    const { id } = await request.json();
    const result = await db
      .delete(Collections)
      .where(eq(Collections.id, id))
      .returning();

    if (!result.length) {
      return json({ error: "Category not found" }, { status: 404 });
    }

    return json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete category:", error);
    return json({ error: error.message }, { status: 500 });
  }
};

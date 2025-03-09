import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/auth";

export const GET: RequestHandler = async ({ params }) => {
  const { userId } = params;
  const { data: cartItems, error } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      product:products!inner(*)
    `,
    )
    .eq("user_id", userId);

  if (error) {
    return json({ error: error.message }, { status: 500 });
  }

  // Filter out any cart items where the product no longer exists
  const validCartItems = cartItems?.filter((item: any) => item.product) || [];

  return json(validCartItems);
};

export const POST: RequestHandler = async ({ request, params }) => {
  const { userId } = params;
  const { product_id, quantity } = await request.json();

  const { error } = await supabase.from("cart_items").upsert({
    user_id: userId,
    product_id,
    quantity,
  });

  if (error) {
    return json({ error: error.message }, { status: 500 });
  }

  return json({ success: true });
};

export const DELETE: RequestHandler = async ({ request, params }) => {
  const { userId } = params;
  const { id } = await request.json();
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .match({ id, user_id: userId });

  if (error) {
    return json({ error: error.message }, { status: 500 });
  }

  return json({ success: true });
};

import { supabase } from '../supabase';
import type { Order } from '$lib/models/Order';

export const getOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Order[];
};

export const createOrder = async (userId: string, orderData: Partial<Order>) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([{ user_id: userId, ...orderData }])
    .select()
    .single();

  if (error) throw error;
  return data as Order;
};
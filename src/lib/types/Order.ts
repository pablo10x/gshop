export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  created_at: string;
}
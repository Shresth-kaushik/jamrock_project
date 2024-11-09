export interface Database {
  public: {
    Tables: {
      ticket_purchases: {
        Row: {
          id: string;
          name: string;
          phone_number: string;
          tickets_count: number;
          ticket_ids: string[];
          total_amount: number;
          payment_status: 'pending' | 'completed' | 'failed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          phone_number: string;
          tickets_count: number;
          ticket_ids: string[];
          total_amount: number;
          payment_status?: 'pending' | 'completed' | 'failed';
        };
        Update: {
          payment_status?: 'pending' | 'completed' | 'failed';
        };
      };
    };
  };
}
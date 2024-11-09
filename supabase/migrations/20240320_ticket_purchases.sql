-- Drop existing table if it exists
DROP TABLE IF EXISTS ticket_purchases CASCADE;

-- Create the ticket_purchases table with all required columns
CREATE TABLE ticket_purchases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL,
    phone_number VARCHAR NOT NULL,
    tickets_count INTEGER NOT NULL CHECK (tickets_count > 0),
    ticket_ids JSONB NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount > 0),
    payment_status VARCHAR NOT NULL DEFAULT 'pending',
    stripe_session_id VARCHAR,
    payment_intent_id VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_ticket_purchases_created_at ON ticket_purchases(created_at);
CREATE INDEX idx_ticket_purchases_payment_status ON ticket_purchases(payment_status);
CREATE INDEX idx_ticket_purchases_stripe_session ON ticket_purchases(stripe_session_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating updated_at
CREATE TRIGGER update_ticket_purchases_updated_at
    BEFORE UPDATE ON ticket_purchases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE ticket_purchases ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Enable insert for everyone" ON ticket_purchases
    FOR INSERT TO public
    WITH CHECK (true);

CREATE POLICY "Enable select for everyone" ON ticket_purchases
    FOR SELECT TO public
    USING (true);

CREATE POLICY "Enable update for service role" ON ticket_purchases
    FOR UPDATE TO service_role
    USING (true)
    WITH CHECK (true);
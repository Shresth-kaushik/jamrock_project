-- Create the ticket_purchases table
CREATE TABLE ticket_purchases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL,
    phone_number VARCHAR NOT NULL,
    tickets_count INTEGER NOT NULL CHECK (tickets_count > 0),
    ticket_ids JSONB NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create an index on created_at for better query performance
CREATE INDEX idx_ticket_purchases_created_at ON ticket_purchases(created_at);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_ticket_purchases_updated_at
    BEFORE UPDATE ON ticket_purchases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Set up Row Level Security (RLS)
ALTER TABLE ticket_purchases ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert
CREATE POLICY "Allow public insert" ON ticket_purchases
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Create a policy that only allows reading own records
CREATE POLICY "Allow individual read" ON ticket_purchases
    FOR SELECT
    TO public
    USING (auth.uid() IS NOT NULL);
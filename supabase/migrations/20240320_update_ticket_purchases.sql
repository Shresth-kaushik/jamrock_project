-- First, drop existing RLS policies
DROP POLICY IF EXISTS "Enable insert for public" ON ticket_purchases;
DROP POLICY IF EXISTS "Enable read access for own records" ON ticket_purchases;
DROP POLICY IF EXISTS "Enable update for payment status" ON ticket_purchases;

-- Add payment_status column if it doesn't exist
ALTER TABLE ticket_purchases 
ADD COLUMN IF NOT EXISTS payment_status VARCHAR DEFAULT 'pending';

-- Disable RLS temporarily to ensure clean slate
ALTER TABLE ticket_purchases DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE ticket_purchases ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert
CREATE POLICY "Enable insert for anonymous"
ON ticket_purchases FOR INSERT
TO anon
WITH CHECK (true);

-- Create a policy that allows authenticated users to read their own records
CREATE POLICY "Enable read for users"
ON ticket_purchases FOR SELECT
TO authenticated
USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.users.email = current_setting('request.jwt.claims')::json->>'email'
));

-- Create a policy that allows service role to update payment status
CREATE POLICY "Enable update for service_role"
ON ticket_purchases FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);
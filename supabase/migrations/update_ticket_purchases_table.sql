-- Add payment_status column to ticket_purchases table
ALTER TABLE ticket_purchases 
ADD COLUMN payment_status VARCHAR NOT NULL DEFAULT 'pending',
ADD COLUMN stripe_session_id VARCHAR,
ADD COLUMN payment_intent_id VARCHAR;

-- Update the insert policy to allow setting payment_status
DROP POLICY IF EXISTS "Allow public insert" ON ticket_purchases;
CREATE POLICY "Allow public insert" ON ticket_purchases
    FOR INSERT
    TO public
    WITH CHECK (payment_status = 'pending');

-- Add index for payment_status
CREATE INDEX idx_ticket_purchases_payment_status ON ticket_purchases(payment_status);
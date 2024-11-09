ALTER TABLE ticket_purchases
ADD COLUMN payment_status VARCHAR NOT NULL DEFAULT 'pending',
ADD COLUMN stripe_session_id VARCHAR,
ADD COLUMN payment_intent_id VARCHAR;
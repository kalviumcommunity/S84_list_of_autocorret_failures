-- Insert users
INSERT INTO users (username, email) VALUES
('john_doe', 'john@example.com'),
('jane_smith', 'jane@example.com'),
('bob_jones', 'bob@example.com');

-- Insert failures
INSERT INTO failures (text, intended, fail_level, submitted_by, context, created_by) VALUES
('Let’s meat', 'Let’s meet', 'moderate', 'John', 'Lunch plan', 1),
('Duck you', 'Duck you', 'low', 'Jane', 'Casual chat', 2),
('I’m hapy', 'I’m happy', 'high', 'Bob', 'Texting error', 3),
('Noon meating', 'Noon meeting', 'moderate', 'John', 'Work schedule', 1),
('Grate job', 'Great job', 'low', 'Jane', 'Compliment', 2);
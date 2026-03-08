USE frostella_db;

-- Wait a moment before running if the schema was just built
INSERT INTO Users (name, email, password, phone, role) VALUES 
('Admin User', 'admin@frostella.com', '$2a$10$X8XzQ5FvX1XzQ5FvX1XzQ.gXo', '9876543210', 'ADMIN'),
('Subham Customer', 'subham@example.com', '$2a$10$X8XzQ5FvX1XzQ5FvX1XzQ.gXo', '1234567890', 'CUSTOMER');

INSERT INTO Products (name, description, price, category, image_url, is_available) VALUES 
('Chocolate Truffle', 'A deeply rich and moist 100% eggless treat crafted to make your moments perfect. Baked with premium chocolate ganache.', 650.00, 'Cakes', '/images/chocolate_truffle.png', true),
('Vanilla Buttercream', 'Classic fluffy eggless vanilla sponge cake layered with rich buttercream. Perfect for all ages.', 550.00, 'Cakes', '/images/pineapple_cake.png', true),
('Red Velvet Cupcake', 'Our signature eggless red velvet cupcake topped with our distinctive sweet cream cheese frosting.', 80.00, 'Cupcakes', '/images/cupcakes.png', true),
('Custom Anniversary Base', 'A customizable base for your special anniversary. Add detailed instructions at checkout.', 1200.00, 'Custom Cakes', '/images/red_velvet.png', true),
('Blueberry Bliss', 'Delicious baked eggless cake filled with fresh blueberry compote.', 700.00, 'Cakes', '/images/chocolate_truffle.png', true),
('Theme Party Cupcakes (Box of 6)', 'A box of 6 customizable themed eggless cupcakes.', 450.00, 'Cupcakes', '/images/cupcakes.png', true);

-- Add some dummy orders for the admin dashboard to process
INSERT INTO Orders (user_id, total_amount, status, delivery_address, delivery_date, payment_method) VALUES 
(2, 650.00, 'PENDING', '123 Tech Lane, Howrah', '2026-03-10', 'COD'),
(2, 1200.00, 'PROCESSING', '123 Tech Lane, Howrah', '2026-03-09', 'ONLINE'),
(2, 160.00, 'DELIVERED', '123 Tech Lane, Howrah', '2026-03-01', 'COD');

-- Link items to those orders (Order 1: Chocolate Truffle, Order 2: Anniversary Cake, Order 3: 2 Red Velvet Cupcakes)
INSERT INTO Order_Items (order_id, product_id, quantity, price) VALUES 
(1, 1, 1, 650.00),
(2, 4, 1, 1200.00),
(3, 3, 2, 80.00);

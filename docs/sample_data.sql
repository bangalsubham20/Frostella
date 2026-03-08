-- Sample Data for Frostella Bakery

USE frostella_db;

-- Insert Admin User (Password: admin123)
INSERT INTO Users (name, email, password, phone, role) 
VALUES ('Roshni Patra', 'admin@frostella.com', '$2a$10$B6o3e3eE7k.e8oP3Qj6vHe6oP3Qj6vHe6oP3Qj6vHe6oP3Qj6vHe', '9876543210', 'ADMIN');

-- Insert Customer (Password: customer123)
INSERT INTO Users (name, email, password, phone, role) 
VALUES ('Subham', 'subham@example.com', '$2a$10$B6o3e3eE7k.e8oP3Qj6vHe6oP3Qj6vHe6oP3Qj6vHe6oP3Qj6vHe', '9999999999', 'CUSTOMER');

-- Insert Sample Products
INSERT INTO Products (name, description, price, category, image_url, is_available) VALUES 
('Chocolate Truffle Cake', 'Rich, moist chocolate cake layered with decadent dark chocolate ganache.', 650.00, 'Cakes', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', 1),
('Pineapple Delight', 'Fresh vanilla sponge with segments of juicy pineapple and whipped cream.', 550.00, 'Cakes', 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=800&q=80', 1),
('Red Velvet Cupcakes (Set of 6)', 'Classic crimson velvet cupcakes topped with silky cream cheese frosting.', 480.00, 'Cupcakes', 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=80', 1),
('Custom Wedding Cake', 'Elegantly designed multi-tier cake customized to your wedding theme.', 2500.00, 'Custom Cakes', 'https://images.unsplash.com/photo-1535254973556-3bb24adca1a9?auto=format&fit=crop&w=800&q=80', 1);

-- Insert Sample Reviews
INSERT INTO Reviews (user_id, product_id, rating, comment) VALUES 
(2, 1, 5, 'The best chocolate cake I have ever had! Totally worth it.'),
(2, 3, 4, 'Very soft and tasty. The frosting was perfect.');

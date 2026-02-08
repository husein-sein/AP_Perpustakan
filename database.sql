-- Database Library Management System
CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books Table
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20),
    category VARCHAR(100),
    year_published INT,
    cover_image VARCHAR(1000),
    origin VARCHAR(100) DEFAULT 'Indonesia',
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    user_id INT,
    borrow_date DATE,
    due_date DATE,
    return_date DATE,
    duration INT DEFAULT 7,
    status ENUM('Dipinjam', 'Dikembalikan', 'Terlambat') DEFAULT 'Dipinjam',
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Seed Data (Password is 'password' hashed)
-- Note: bcrypt hashes should be generated in the app, but for schema:
-- admin@lib.com / password
-- user@lib.com / password

INSERT INTO users (name, email, password, role) VALUES
('Admin Utama', 'admin@lib.com', '$2a$10$Xm7G.p1fV8kUj/bW6mBwK.j9B/3I0P5V8kUj/bW6mBwK.j9B/3I0', 'admin'),
('Jon', 'jon@lib.com', '$2a$10$Xm7G.p1fV8kUj/bW6mBwK.j9B/3I0P5V8kUj/bW6mBwK.j9B/3I0', 'user');

INSERT INTO books (title, author, isbn, category, year_published, origin, stock) VALUES
('Laskar Pelangi', 'Andrea Hirata', '978-979-3062-79-1', 'Fiksi', 2005, 'Indonesia', 5),
('Bumi', 'Tere Liye', '978-602-03-3295-6', 'Fiksi', 2014, 'Indonesia', 3),
('Filosofi Teras', 'Henry Manampiring', '978-602-412-518-9', 'Self Improvement', 2018, 'Indonesia', 8);

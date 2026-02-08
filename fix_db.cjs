const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../server/.env' });

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'library_db'
});

async function seed() {
    try {
        const password = 'password';
        const hash = await bcrypt.hash(password, 10);

        db.connect();

        // Create database if not exists
        db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'library_db'}`);
        db.query(`USE ${process.env.DB_NAME || 'library_db'}`);

        // Create Tabels
        const createUsers = `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'user',
      profile_image VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

        const createBooks = `CREATE TABLE IF NOT EXISTS books (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      isbn VARCHAR(20),
      category VARCHAR(100),
      year_published INT,
      cover_image VARCHAR(255),
      origin VARCHAR(100) DEFAULT 'Indonesia',
      stock INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

        const createTrans = `CREATE TABLE IF NOT EXISTS transactions (
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
    )`;

        db.query(createUsers);
        db.query(createBooks);
        db.query(createTrans);

        // Insert Default Data
        db.query('DELETE FROM users');
        db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            ['Admin Utama', 'admin@lib.com', hash, 'admin']);
        db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            ['Jon', 'jon@lib.com', hash, 'user']);

        console.log('✅ Database berhasil reset & akun login siap!');
        console.log('Admin: admin@lib.com | password');
        console.log('User: jon@lib.com | password');

        process.exit();
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

seed();

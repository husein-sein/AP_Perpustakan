const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect WITHOUT database first to create it
const dbInit = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
});

async function seed() {
    try {
        const password = 'password';
        const hash = await bcrypt.hash(password, 10);
        const dbName = process.env.DB_NAME || 'library_db';

        dbInit.connect();

        console.log('⏳ Menyiapkan database...');

        // 1. Create database
        await dbInit.promise().query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        await dbInit.promise().query(`USE ${dbName}`);

        // 2. Create Tables
        console.log('⏳ Membuat tabel...');
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

        await dbInit.promise().query(createUsers);
        await dbInit.promise().query(createBooks);
        await dbInit.promise().query(createTrans);

        // 3. Insert Default Data
        console.log('⏳ Mengisi data default...');
        await dbInit.promise().query('DELETE FROM users');
        await dbInit.promise().query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            ['Admin Utama', 'admin@lib.com', hash, 'admin']);
        await dbInit.promise().query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            ['Jon', 'jon@lib.com', hash, 'user']);

        console.log('✅ BERHASIL! Database dan Akun siap digunakan.');
        console.log('-----------------------------------------');
        console.log('Admin: admin@lib.com | password');
        console.log('User: jon@lib.com | password');
        console.log('-----------------------------------------');

        process.exit();
    } catch (err) {
        console.error('❌ ERROR:', err.message);
        process.exit(1);
    }
}

seed();

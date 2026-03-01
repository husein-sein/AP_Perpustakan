require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'library_db',
    multipleStatements: true
});

db.connect((err) => {
    if (err) console.error('Error connecting to MySQL:', err);
    else console.log('Connected to MySQL database');
});

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// --- AUTH ---
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const q = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(q, [name, email, hashedPassword, 'user'], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'User registered' });
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt for: ${email}`);
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.error('Database error during login:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.length === 0) {
            console.log('User not found:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const user = result[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            console.log(`Invalid password for user: ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log('Login successful for:', email);
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, profile_image: user.profile_image } });
    });
});

// --- BOOKS ---
app.get('/api/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/books', upload.single('cover'), (req, res) => {
    const { title, author, isbn, category, year_published, origin, stock } = req.body;
    const cover_image = req.file ? req.file.filename : null;
    const q = 'INSERT INTO books (title, author, isbn, category, year_published, origin, stock, cover_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(q, [title, author, isbn, category, year_published, origin, stock, cover_image], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, title });
    });
});

// --- TRANSACTIONS ---
app.get('/api/transactions', (req, res) => {
    const q = `
    SELECT t.*, b.title as book_title, b.cover_image, u.name as borrower_name 
    FROM transactions t
    JOIN books b ON t.book_id = b.id
    JOIN users u ON t.user_id = u.id
    ORDER BY t.borrow_date DESC
  `;
    db.query(q, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// --- BORROWERS ---
app.get('/api/borrowers', (req, res) => {
    db.query("SELECT id, name, CONCAT('XI-', SUBSTRING(name, 1, 1)) as class FROM users WHERE role = 'user'", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/transactions', (req, res) => {
    const { book_id, user_id, borrow_date, due_date, duration } = req.body;
    const q = 'INSERT INTO transactions (book_id, user_id, borrow_date, due_date, duration, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(q, [book_id, user_id, borrow_date, due_date, duration || 7, 'Dipinjam'], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId });
    });
});

app.put('/api/transactions/:id/return', (req, res) => {
    const return_date = new Date().toISOString().split('T')[0];
    const q = "UPDATE transactions SET status = 'Dikembalikan', return_date = ? WHERE id = ?";
    db.query(q, [return_date, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Book returned' });
    });
});

// --- STATS ---
app.get('/api/stats', (req, res) => {
    const q = `
        SELECT COUNT(*) as total_books FROM books;
        SELECT COUNT(*) as borrowed_books FROM transactions WHERE status = 'Dipinjam';
        SELECT COUNT(*) as late_returns FROM transactions WHERE status = 'Dipinjam' AND due_date < CURDATE();
    `;

    db.query(q, (err, results) => {
        if (err) {
            console.error('Stats query error:', err);
            return res.status(500).json({ error: 'Failed to fetch stats' });
        }
        res.json({
            total_books: results[0][0].total_books,
            borrowed_books: results[1][0].borrowed_books,
            late_returns: results[2][0].late_returns
        });
    });
});

// --- PROFILE ---
app.put('/api/users/:id', upload.single('photo'), (req, res) => {
    const { name } = req.body;
    const photo = req.file ? req.file.filename : null;
    let q = 'UPDATE users SET name = ?';
    let params = [name];
    if (photo) {
        q += ', profile_image = ?';
        params.push(photo);
    }
    q += ' WHERE id = ?';
    params.push(req.params.id);

    db.query(q, params, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Profile updated', profile_image: photo });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

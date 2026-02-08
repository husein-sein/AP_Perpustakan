const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedBooks() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'library_db'
    });

    console.log('Seeding books with fixed images...');

    const books = [
        ['Laskar Pelangi', 'Andrea Hirata', 'Fiksi', 5, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300'],
        ['Bumi', 'Tere Liye', 'Fiksi', 3, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300'],
        ['Filosofi Teras', 'Henry Manampiring', 'Self Improvement', 8, 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=300'],
        ['Negeri 5 Menara', 'A. Fuadi', 'Fiksi', 4, 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=300'],
        ['Pulang', 'Leila S. Chudori', 'Sejarah', 2, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=300'],
        ['Laut Bercerita', 'Leila S. Chudori', 'Fiksi', 6, 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300'],
        ['Cantik Itu Luka', 'Eka Kurniawan', 'Fiksi', 3, 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=300'],
        ['Ronggeng Dukuh Paruk', 'Ahmad Tohari', 'Sejarah', 5, 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300'],
        ['Perahu Kertas', 'Dee Lestari', 'Fiksi', 7, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300'],
        ['Ayat-Ayat Cinta', 'Habiburrahman El Shirazy', 'Fiksi', 9, 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPSq3QdC1P3W_lIZSTtAtEulUTL5wplJ9XFy3-CS2BFJAreyqSNNiVP0OPgGwk418-Z13L3gqwnY8oWiBfE0VNkFXBnzsbpN5GBEE4LEwX9AQYVvIceZgJjA7Be8Q1q0F_HUJTgaidEqwSBp70KvHVYuHpUBS1vuFIDt6FkaCKDc8nVviuEyqub6th/w800/1656902167.png'],
        ['Dilan 1990', 'Pidi Baiq', 'Fiksi', 12, 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=300'],
        ['Supernova', 'Dee Lestari', 'Sains', 4, 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=300'],
        ['Hujan', 'Tere Liye', 'Sains', 6, 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=300'],
        ['Sang Pemimpi', 'Andrea Hirata', 'Fiksi', 8, 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=300'],
        ['Garis Waktu', 'Fiersa Besari', 'Self Improvement', 5, 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=300'],
        ['Madre', 'Dee Lestari', 'Fiksi', 3, 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=300'],
        ['Robohnya Surau Kami', 'A.A. Navis', 'Sejarah', 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5AIB_dHuMB2KEZyTuJTi9Zso1LdYL1YQLIQ&s'],
        ['Sabtu Bersama Bapak', 'Adhitya Mulya', 'Fiksi', 7, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVLVGXuoX__fpVGZ8UTYVEsEZxW7odss5Gmw&s']
    ];

    try {
        await connection.execute('DELETE FROM transactions');
        await connection.execute('DELETE FROM books');

        const q = 'INSERT INTO books (title, author, category, stock, cover_image) VALUES (?, ?, ?, ?, ?)';
        for (const book of books) {
            await connection.execute(q, book);
        }

        console.log('Successfully seeded 18 books with working images.');
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        await connection.end();
    }
}

seedBooks();

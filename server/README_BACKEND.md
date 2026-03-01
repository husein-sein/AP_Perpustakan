# Dokumentasi Backend (Server)

Dokumen ini menjelaskan teknologi dan struktur API yang digunakan pada backend aplikasi perpustakaan ini.

## 🛠️ Teknologi (Tech Stack)

Backend ini dibangun menggunakan teknologi berikut:

*   **Node.js**: Runtime environment untuk menjalankan JavaScript di server.
*   **Express.js**: Framework web untuk membuat API dan routing.
*   **MySQL**: Database relasional untuk menyimpan data user, buku, dan transaksi.
*   **Library Pendukung**:
    *   `mysql2`: Driver untuk menghubungkan Node.js dengan database MySQL.
    *   `cors`: Mengizinkan akses dari frontend (Cross-Origin Resource Sharing).
    *   `bcryptjs`: Untuk enkripsi (hashing) password pengguna agar aman.
    *   `jsonwebtoken (JWT)`: Untuk autentikasi pengguna (login) dan keamanan route.
    *   `multer`: Middleware untuk menangani upload file (seperti cover buku dan foto profil).
    *   `dotenv`: Mengelola variabel lingkungan (environment variables) dari file `.env`.
    *   `nodemon`: Utilitas untuk development (restart server otomatis saat ada perubahan kode).

## 🚀 Cara Menjalankan

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Setup Database**:
    Pastikan database MySQL sudah dibuat dan konfigurasinya sesuai di file `.env`.

3.  **Jalankan Server (Mode Development)**:
    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:5000` (atau port yang ditentukan di `.env`).

## 🔌 API Endpoints

Berikut adalah daftar endpoint API yang tersedia di `index.js`:

### 🔐 Autentikasi (`/api/auth`)
*   **POST** `/api/auth/register`: Mendaftarkan pengguna baru (Admin/User).
*   **POST** `/api/auth/login`: Login pengguna dan mendapatkan Token JWT & data user.

### 📚 Buku (`/api/books`)
*   **GET** `/api/books`: Mengambil semua daftar buku.
*   **POST** `/api/books`: Menambahkan buku baru (mendukung upload gambar cover).

### 🔄 Transaksi Peminjaman (`/api/transactions`)
*   **GET** `/api/transactions`: Mengambil semua data transaksi peminjaman (join dengan tabel buku dan user).
*   **POST** `/api/transactions`: Membuat transaksi peminjaman baru.
*   **PUT** `/api/transactions/:id/return`: Mengembalikan buku (mengupdate status menjadi 'Dikembalikan' dan set tanggal kembali).

### 👥 Pengguna & Peminjam (`/api/users`, `/api/borrowers`)
*   **GET** `/api/borrowers`: Mengambil daftar user dengan role 'user' (untuk dropdown peminjaman).
*   **PUT** `/api/users/:id`: Mengupdate profil pengguna (Nama dan Foto Profil).

## 📂 Struktur Folder Penting
*   `index.js`: Entry point utama aplikasi, berisi konfigurasi server dan semua route.
*   `uploads/`: Folder tempat menyimpan file gambar yang diupload.
*   `.env`: Konfigurasi sensitif (Database credentials, JWT Secret).
